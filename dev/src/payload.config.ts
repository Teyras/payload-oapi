import { buildConfig } from 'payload/config'
import path from 'path'
import { Users } from './collections/Users'
import { Pets, Categories } from './collections/Pets'

import openapi from '../../src/openapiPlugin'
import swaggerUI from '../../src/swaggerUIPlugin'
import { FeaturedPet } from './globals/FeaturedPet'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  collections: [Users, Pets, Categories],
  globals: [FeaturedPet],
  cors: '*',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  plugins: [
    openapi({ openapiVersion: '3.0', metadata: { title: 'Dev API', version: '0.0.1' } }),
    swaggerUI({}),
  ],
  onInit: async payload => {
    await payload.create({
      collection: 'users',
      data: {
        email: 'dev@payloadcms.com',
        password: 'test',
      },
    })

    const doggosCategory = await payload.create({
      collection: 'petCategories',
      data: {
        name: 'Doggos',
      },
    })

    await payload.create({
      collection: 'petCategories',
      data: {
        name: 'Puppers',
      },
    })

    await payload.create({
      collection: 'pets',
      data: {
        name: 'Doggo McPupperton',
        status: 'available',
        category: doggosCategory.id,
      },
    })

    await payload.create({
      collection: 'pets',
      data: {
        name: 'Bubbles',
        status: 'sold',
      },
    })
  },
})
