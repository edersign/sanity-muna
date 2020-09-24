import S from '@sanity/desk-tool/structure-builder'
import {FaCog, FaGlasses, FaMapMarkedAlt} from 'react-icons/fa'
import {GiBoltSpellCast} from 'react-icons/gi'
import {TiGroup, TiUser} from 'react-icons/ti'
import {BsFileRichtext} from 'react-icons/bs'
import {FcTimeline} from 'react-icons/Fc'
import {MdEvent} from 'react-icons/md'
import blog from './src/structure/blog'
import pageBuilder from './src/structure/pageBuilder'
import types from './src/structure/types'
import management from './src/structure/management'
import madeObject from './src/structure/madeObject'

const hiddenDocTypes = listItem =>
  ![
    'madeObject',
    'collection',
    'actor',
    'group',
    'period',
    'event',
    'activity',
    'linguisticObject',
    'report',
    'acquisition',
    'move',
    'designOrProcedure',
    'timeline',
    'exhibition',
    'project',
    'siteSettings',
    'place',
    'systemCategory',
    'concept',
    'material',
    'work',
    'visualItem',
    'language',
    'objectType',
    'placeType',
    'eventType',
    'exhibitionType',
    'actorType',
    'groupType',
    'textType',
    'workType',
    'technique',
    'storageType',
    'sectionType',
    'reportType',
    'measurementUnit',
    'identifierType',
    'dimensionType',
    'conditionType',
    'activityType',
    'acquisitionType',
    'appelationType',
    'role',
    'navigationMenu',
    'navigationItem',
    'page',
    'post',
    'route',
    'storage',
    'writtenText'
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Innhold')
    .items([
      madeObject,
      S.listItem()
      .title('Utstillinger')
      .icon(FaGlasses)
      .child(
        S.list()
          .title('Utstillinger')
          .items([
            S.listItem()
              .title('Utstillinger etter type')
              .icon(FaGlasses)
              .child(
                // List out all categories
                S.documentTypeList('exhibitionType')
                  .title('Utstillinger etter type')
                  .filter('_type == "exhibitionType"')
                  .child(catId =>
                    // List out project documents where the _id for the selected
                    // category appear as a _ref in the project’s categories array
                    S.documentList()
                      .schemaType('exhibition')
                      .title('Utstillinger')
                      .filter('_type == "exhibition" && $catId in hasType[]._ref')
                      .params({catId})
                  )
              ),
            S.listItem()
              .title('Upubliserte utstillinger')
              .icon(FaGlasses)
              .child(
                // List out all categories
                S.documentTypeList('exhibition')
                  .title('Upubliserte utstillinger')
                  .filter('_type == "exhibition" && accessState == "secret"')
              ),
            S.listItem()
              .title('Til gjennomgang')
              .icon(FaGlasses)
              .child(
                // List out all categories
                S.documentTypeList('exhibition')
                  .title('Til gjennomgang')
                  .filter('_type == "exhibition" && editorialState == "review"')
              ),
            S.listItem()
              .title('Alle utstillinger')
              .icon(FaGlasses)
              .child(
                S.documentTypeList('exhibition')
                  .title('Alle utstillinger')
              )
          ])
      ),
      S.divider(),
      S.listItem()
        .title('Aktører')
        .icon(TiUser)
        .child(
          S.list()
            .title('Aktører')
            .items([
              S.listItem()
                .title('Aktører etter type')
                .icon(TiUser)
                .child(
                  // List out all categories
                  S.documentTypeList('actorType')
                    .title('Aktører etter type')
                    .filter('_type == "actorType"')
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('actor')
                        .title('Aktører')
                        .filter('_type == "actor" && $catId in hasType[]._ref')
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte poster')
                .icon(TiUser)
                .child(
                  // List out all categories
                  S.documentTypeList('actor')
                    .title('Upubliserte objekter')
                    .filter('_type == "actor" && accessState == "secret"')
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(TiUser)
                .child(
                  // List out all categories
                  S.documentTypeList('actor')
                    .title('Til gjennomgang')
                    .filter('_type == "actor" && editorialState == "review"')
                ),
              S.listItem()
                .title('Alle Aktører')
                .icon(TiUser)
                .child(
                  S.documentTypeList('actor')
                    .title('Alle Aktører')
                )
            ])
        ),
      S.listItem()
        .title('Grupper')
        .icon(TiGroup)
        .child(
          S.list()
            .title('Grupper')
            .items([
              S.listItem()
                .title('Grupper etter type')
                .icon(TiGroup)
                .child(
                  // List out all categories
                  S.documentTypeList('groupType')
                    .title('Grupper etter type')
                    .filter('_type == "groupType"')
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('group')
                        .title('Grupper')
                        .filter('_type == "group" && $catId in hasType[]._ref')
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte poster')
                .icon(TiGroup)
                .child(
                  // List out all categories
                  S.documentTypeList('group')
                    .title('Upubliserte objekter')
                    .filter('_type == "group" && accessState == "secret"')
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(TiGroup)
                .child(
                  // List out all categories
                  S.documentTypeList('group')
                    .title('Til gjennomgang')
                    .filter('_type == "group" && editorialState == "review"')
                ),
              S.listItem()
                .title('Alle grupper')
                .icon(TiGroup)
                .child(
                  S.documentTypeList('group')
                    .title('Alle grupper')
                )
            ])
        ),
      S.listItem()
        .title('Steder')
        .icon(FaMapMarkedAlt)
        .child(
          S.list()
            .title('Steder')
            .items([
              S.listItem()
                .title('Steder etter type')
                .icon(FaMapMarkedAlt)
                .child(
                  // List out all categories
                  S.documentTypeList('placeType')
                    .title('Steder etter type')
                    .filter('_type == "placeType"')
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('place')
                        .title('Steder')
                        .filter('_type == "place" && $catId in hasType[]._ref')
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle steder')
                .icon(FaMapMarkedAlt)
                .child(
                  S.documentTypeList('place')
                    .title('Alle steder')
                )
            ])
        ),
      S.divider(),
      S.documentTypeListItem('work').title('Verk'),
      S.documentTypeListItem('visualItem').title('Visuell ting'),
      S.listItem()
        .title('Tekster')
        .icon(BsFileRichtext)
        .child(
          S.list()
            .title('Tekster')
            .items([
              S.listItem()
                .title('Tekster etter type')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('textType')
                    .title('Tekster etter type')
                    .filter('_type == "textType"')
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('writtenText')
                        .title('Tekster')
                        .filter('_type == "writtenText" && $catId in hasType[]._ref')
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Upubliserte tekster')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('writtenText')
                    .title('Upubliserte tekster')
                    .filter('_type == "writtenText" && accessState == "secret"')
                ),
              S.listItem()
                .title('Til gjennomgang')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('writtenText')
                    .title('Til gjennomgang')
                    .filter('_type == "writtenText" && editorialState == "review"')
                ),
              S.listItem()
                .title('Alle tekster')
                .icon(FaGlasses)
                .child(
                  S.documentTypeList('writtenText')
                    .title('Alle tekster')
                )
            ])
        ),
      S.divider(),
      // TYPE
      types,
      S.documentTypeListItem('period').title('Perioder'),
      S.listItem()
        .title('Hendelser')
        .icon(MdEvent)
        .child(
          S.list()
            .title('Hendelser')
            .items([
              S.listItem()
                .title('Hendelser etter type')
                .icon(MdEvent)
                .child(
                  // List out all categories
                  S.documentTypeList('eventType')
                    .title('Hendelser etter type')
                    .filter('_type == "eventType"')
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('event')
                        .title('Hendelser')
                        .filter('_type == "event" && $catId in hasType[]._ref')
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle hendelser')
                .icon(MdEvent)
                .child(
                  S.documentTypeList('event')
                    .title('Alle hendelser')
                )
            ])
        ),
      // ACTIVITY
      S.listItem()
        .title('Aktiviteter')
        .icon(GiBoltSpellCast)
        .child(
          S.list()
            .title('Aktiviteter')
            .items([
              S.listItem()
                .title('Aktiviteter etter type')
                .icon(GiBoltSpellCast)
                .child(
                  // List out all categories
                  S.documentTypeList('activityType')
                    .title('Aktiviteter etter type')
                    .filter('_type == "activityType"')
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('activity')
                        .title('Aktiviteter')
                        .filter('_type == "activity" && $catId in hasType[]._ref')
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Alle aktiviteter')
                .icon(GiBoltSpellCast)
                .child(
                  S.documentTypeList('activity')
                    .title('Alle aktiviteter')
                )
            ])
        ),
      S.divider(),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      blog,
      S.listItem()
      .title('Tidslinjer')
      .icon(FcTimeline)
      .child(
        S.list()
          .title('Tidslinjer')
          .items([
            S.listItem()
              .title('Upubliserte tidslinjer')
              .icon(FcTimeline)
              .child(
                // List out all categories
                S.documentTypeList('timeline')
                  .title('Upubliserte tidslinjer')
                  .filter('_type == "timeline" && accessState == "secret"')
              ),
            S.listItem()
              .title('Til gjennomgang')
              .icon(FcTimeline)
              .child(
                // List out all categories
                S.documentTypeList('timeline')
                  .title('Til gjennomgang')
                  .filter('_type == "timeline" && editorialState == "review"')
              ),
            S.listItem()
              .title('Alle tidslinjer')
              .icon(FcTimeline)
              .child(
                S.documentTypeList('timeline')
                  .title('Alle tidslinjer')
              )
          ])
      ),
      pageBuilder,
      S.divider(),
      management,
      S.divider(),
      // SETTINGS SINGLETON
      S.listItem()
        .title('Side innstillinger')
        .icon(FaCog)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
    ])
