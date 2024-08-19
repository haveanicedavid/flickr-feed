import { appRouter, trpc } from '../trpc'

jest.mock('flickr-sdk', () => ({
  createFlickr: jest.fn(() => ({
    flickr: require('./mocks/flickr').mockFlickr,
  })),
}))

describe('appRouter - stub data', () => {
  const caller = trpc.createCallerFactory(appRouter)({})

  describe('getPhotos', () => {
    it('should force refresh when forceRefresh is true', async () => {
      const firstCall = await caller.getPhotos({ forceRefresh: false })
      const secondCall = await caller.getPhotos({ forceRefresh: true })

      expect(firstCall).not.toEqual(secondCall)
    })
  })

  describe('searchPhotos', () => {
    it('should return photos for a given tag', async () => {
      const result = await caller.searchPhotos({
        tag: 'nature',
        forceRefresh: false,
      })

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('farm')
      expect(result[0]).toHaveProperty('server')
      expect(result[0]).toHaveProperty('secret')
      expect(result[0]).toHaveProperty('title')
    })

    it('should force refresh when forceRefresh is true', async () => {
      const firstCall = await caller.searchPhotos({
        tag: 'nature',
        forceRefresh: false,
      })
      const secondCall = await caller.searchPhotos({
        tag: 'nature',
        forceRefresh: true,
      })

      expect(firstCall).not.toEqual(secondCall)
    })
  })

  describe('getPhoto', () => {
    it('should return photo info for a given id', async () => {
      const result = await caller.getPhoto({ id: '123' })

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('farm')
      expect(result).toHaveProperty('server')
      expect(result).toHaveProperty('secret')
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('owner')
      expect(result).toHaveProperty('description')
    })
  })
})
