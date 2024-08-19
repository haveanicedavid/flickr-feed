import { initTRPC } from '@trpc/server'
import dotenv from 'dotenv'
import { createFlickr } from 'flickr-sdk'
import NodeCache from 'node-cache'
import { z } from 'zod'

import type { FlickrPhoto } from './types'

dotenv.config()

const apiKey = process.env.FLICKR_API_KEY
if (!apiKey) {
  throw new Error('FLICKR_API_KEY is not defined in the environment variables')
}
const { flickr } = createFlickr(apiKey)

// Initialize NodeCache with a default TTL of 60 seconds
const cache = new NodeCache({ stdTTL: 60 })

export const trpc = initTRPC.create()

export const appRouter = trpc.router({
  getPhotos: trpc.procedure
    .input(z.object({ forceRefresh: z.boolean().optional() }))
    .query(async ({ input }) => {
      const cacheKey = 'recentPhotos'
      if (!input.forceRefresh) {
        const cachedData = cache.get<FlickrPhoto[]>(cacheKey)
        if (cachedData) {
          return cachedData
        }
      }

      const response = await flickr('flickr.photos.getRecent', {
        per_page: '10',
      })
      cache.set(cacheKey, response.photos.photo)
      return response.photos.photo
    }),

  searchPhotos: trpc.procedure
    .input(z.object({ tag: z.string(), forceRefresh: z.boolean().optional() }))
    .query(async ({ input }) => {
      const cacheKey = `searchPhotos:${input.tag}`
      if (!input.forceRefresh) {
        const cachedData = cache.get<FlickrPhoto[]>(cacheKey)
        if (cachedData) {
          return cachedData
        }
      }

      const response = await flickr('flickr.photos.search', {
        tags: input.tag,
        per_page: '10',
      })
      cache.set(cacheKey, response.photos.photo)
      return response.photos.photo
    }),
})
