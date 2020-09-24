import {nanoid} from 'nanoid'

export const mapMediatypes = (types) => {
  let mappedTypes = []

  types.map(type => {
    switch (type) {
      case 'bøker':
        mappedTypes.push(
          {
            _ref: '9c8240d2-23b6-45f4-8501-bc2723fbf75e',
            _type: 'reference',
            _key: nanoid()
          })
        break
      case 'bilder':
        mappedTypes.push(
          {
            _ref: 'c076b082-3c29-47ee-bd0a-9dee05269a47',
            _type: 'reference',
            _key: nanoid()
          })
        break
      case 'privatarkivmateriale':
        mappedTypes.push(
          {
            _ref: 'c7f0864c0-82e7-4a05-b7e0-b1dc15f3fe6f',
            _type: 'reference',
            _key: nanoid()
          })
        break
      default:
        break
    }
  })

  return mappedTypes
}
