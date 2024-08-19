import { appRouter, trpc } from '../trpc'

// NOTE: This test is using live data from Flickr, so it may fail if the Flickr
// API is down or the network is slow
describe('appRouter - live data', () => {
  const caller = trpc.createCallerFactory(appRouter)({})

  describe('getPhotos', () => {
    it('should return flickr photos with the expected shape', async () => {
      const result = await caller.getPhotos({ forceRefresh: false })

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('farm')
      expect(result[0]).toHaveProperty('server')
      expect(result[0]).toHaveProperty('secret')
      expect(result[0]).toHaveProperty('title')
    })
  })
})
