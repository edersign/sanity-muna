export type Asset = {
  _id: string
  originalFilename: string
}

export type AssetMetadata = {
  source: {
    name: string
    url: string
    id: string
  },
  description: string
  creditLine: string
}

export type MadeObject = {
  _type: 'madeObject'
  _id: string
  accessState: string
  editorialState: string
  license: string
  label: string
  preferredIdentifier: string
  subjectOfManifest: string
  hasType: string
}

export type MainRepresentationFragment = {
  mainRepresentation: {
    _type: 'mainRepresentation',
    asset: {
      _type: 'reference',
      _ref: string
    }
  }
}