import { type SchemaTypeDefinition } from 'sanity'
import frame from './frame'
import client from './client'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [frame, client],
}