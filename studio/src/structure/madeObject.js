import S from '@sanity/desk-tool/structure-builder'
import {
  FaBookOpen as SingleIcon,
  FaBookDead as AllIcon
} from 'react-icons/fa'

// import PreviewIFrame from '../../src/components/previewIFrame'

export const icons = {
  SingleIcon,
  AllIcon
}

const madeObject = S.listItem()
  .title('Objekt')
  .icon(AllIcon)
  .child(
    S.list()
      .title('Objekter')
      .items([
        S.listItem()
          .title('Alle objekter')
          .icon(SingleIcon)
          .child(
            S.documentTypeList('madeObject')
              .title('Alle objekter')
          ),
        S.listItem()
          .title('Objekt etter type')
          .icon(SingleIcon)
          .child(
          // List out all categories
            S.documentList('objectType')
              .schemaType('objectType')
              .title('Objekt etter type')
              .filter('_type == "objectType"')
              .child(catId =>
              // List out project documents where the _id for the selected
              // category appear as a _ref in the project’s categories array
                S.documentList()
                  .schemaType('madeObject')
                  .title('Objekt')
                  .filter(
                    '_type == "madeObject" && $catId in hasType[]._ref'
                  )
                  .params({catId})
              )
          ),
        /* Could be used for parts of a book
        S.listItem()
          .title('Objekt etter deltype')
          .icon(SingleIcon)
          .child(
          // List out all categories
            S.documentTypeList('sectionType')
              .title('Objekt etter deltype')
              .filter('_type == "sectionType"')
              .child(catId =>
              // List out project documents where the _id for the selected
              // category appear as a _ref in the project’s categories array
                S.documentList()
                  .schemaType('madeObject')
                  .title('Objekt')
                  .filter('_type == "madeObject" && $catId in hasType[]._ref')
                  .params({catId})
              )
          ), */
        S.listItem()
          .title('Upubliserte objekter')
          .icon(SingleIcon)
          .child(
          // List out all categories
            S.documentTypeList('madeObject')
              .title('Upubliserte objekter')
              .filter('_type == "madeObject" && accessState == "secret"')
          ),
        S.listItem()
          .title('Til gjennomgang')
          .icon(SingleIcon)
          .child(
          // List out all categories
            S.documentTypeList('madeObject')
              .title('Til gjennomgang')
              .filter('_type == "madeObject" && editorialState == "review"')
          )
      ])
  )

export default madeObject
