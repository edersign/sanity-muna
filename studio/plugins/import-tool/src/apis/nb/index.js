import client from 'part:@sanity/base/client'
import {nanoid} from 'nanoid'
import {mapMediatypes} from '../../helpers'

export const chooseItemNB = async (item) => {
  // Get a 200x200px thumbnail. Maybe change to a bigger size based on thumbnail_custom.
  const imageUrl = item._links.thumbnail_large.href

  const types = mapMediatypes(item.metadata.mediaTypes)

  const doc = {
    _type: 'madeObject',
    _id: `import.${item.id}`,
    accessState: 'open',
    editorialState: 'published',
    license: item.accessInfo && item.accessInfo.isPublicDomain ? 'https://creativecommons.org/publicdomain/mark/1.0/' : 'https://rightsstatements.org/vocab/CNE/1.0/',
    label: item.metadata.title,
    preferredIdentifier: item.id,
    identifiedBy: [
      {
        _type: 'identifier',
        _key: 'bce70cc6a075',
        content: item.id,
        hasType: {
          _type: 'reference',
          _key: nanoid(),
          _ref: 'de22df48-e3e7-47f2-9d29-cae1b5e4d728'
        }
      }
    ],
    hasCurrentOwner: [
      {
        _type: 'reference',
        _key: nanoid(),
        _ref: '37f7376a-c635-420b-8ec6-ec0fd4c4a55c'
      }
    ],
    subjectOfManifest: item._links.presentation.href,
    hasType: types
  }

  /* TODO
    Important to include iiif manifest in asset metadata as the asset could be reused else where in the dataset */
  const assetMeta = {
    source: {
      // The source this image is from
      name: 'nb.no',
      url: item._links.presentation.href,
      // A string that uniquely idenitfies it within the source.
      // In this example the URL is the closest thing we have as an actual ID.
      id: item.id
    },
    description: item.metadata.title,
    creditLine: 'From nb.no'
  }

  const getImageBlob = async (url) => {
    const response = fetch(url)
      .then(response => response.body)
      .then(rs => {
        const reader = rs.getReader()

        return new ReadableStream({
          async start (controller) {
            while (true) {
              const {done, value} = await reader.read()

              // When no more data needs to be consumed, break the reading
              if (done) {
                break
              }

              // Enqueue the next data chunk into our target stream
              controller.enqueue(value)
            }

            // Close the stream
            controller.close()
            reader.releaseLock()
          }
        })
      })
    // Create a new response out of the stream
      .then(rs => new Response(rs))
    // Create an object URL for the response
      .then(response => response.blob())
    return response
  }

  const uploadImageBlob = async (blob) => {
    const res = client.assets
      .upload('image', blob, {contentType: blob.type, filename: `import.${item.id}`})
      .then(document => {
        console.log('The image was uploaded!', document)
        return document
      })
      .catch(error => {
        console.error('Upload failed:', error.message)
      })
    return res
  }

  const patchAssetMeta = async (id, meta) => {
    client
      .patch(id)
      .set(meta)
      .commit()
      .then(document => {
        console.log('The image was patched!', document)
      })
      .catch(error => {
        console.error('Patch failed:', error.message)
      })
  }

  const createDoc = async (doc) => {
    const res = client
      .createIfNotExists(doc)
      .then(result => {
        console.log(`${result._id} was imported!`)
        return result
      })
    return res
  }

  const setAssetRef = async (docID, assetID) => {
    await client
      .patch(docID)
      .set({
        mainRepresentation: {
          _type: 'mainRepresentation',
          asset: {
            _type: 'reference',
            _ref: assetID
          }
        }
      })
      .commit()
      .then(document => {
        console.log('The asset was hooked up!', document)
      })
      .catch(error => {
        console.error('Failed:', error.message)
      })
  }

  try {
    const imageResonse = await getImageBlob(imageUrl)
    const asset = await uploadImageBlob(imageResonse)
    await patchAssetMeta(asset._id, assetMeta)

    const document = await createDoc(doc)
    if (asset && document) {
      await setAssetRef(document._id, asset._id)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(document, asset)
    }
  } catch (err) {
    console.log('There was an error', err)
  }
}