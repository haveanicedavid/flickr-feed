import { initTRPC } from '@trpc/server'
import dotenv from 'dotenv'
import { createFlickr } from 'flickr-sdk'
import { z } from 'zod'

import type { FlickrPhoto } from './types'

dotenv.config()

const apiKey = process.env.FLICKR_API_KEY
if (!apiKey) {
  throw new Error('FLICKR_API_KEY is not defined in the environment variables')
}
const { flickr } = createFlickr(apiKey)

export const trpc = initTRPC.create()

export const appRouter = trpc.router({
  getPhotos: trpc.procedure.query<FlickrPhoto[]>(async () => {
    const response = await flickr('flickr.photos.getRecent', {
      per_page: '10',
    })
    return response.photos.photo
  }),

  searchPhotos: trpc.procedure
    .input(z.object({ tag: z.string() }))
    .query(async ({ input }) => {
      const response = await flickr('flickr.photos.search', {
        tags: input.tag,
        per_page: '10',
      })
      return response.photos.photo
    }),
})
