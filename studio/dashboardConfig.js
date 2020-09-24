export default {
  widgets: [
    {name: 'structure-menu'},
    {name: 'muna-docs-widget'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f6c08e9c6429a63e5deed23',
                  title: 'Sanity Studio',
                  name: 'sanity-muna-studio-sffv68np',
                  apiId: 'b9d2271d-6735-4c00-b16a-740d97f35c59'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/edersign/sanity-muna',
            category: 'Code'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: []},
      layout: {width: 'medium'}
    }
  ]
}
