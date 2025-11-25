import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // False ensures you see updates instantly
  // We will add the token later in Vercel
  token: process.env.SANITY_API_TOKEN, 
})