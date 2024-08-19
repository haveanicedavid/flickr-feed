import { appRouter, trpc } from './trpc'

describe('appRouter', () => {
  // NOTE: This test is using live data from Flickr's API. This is good for
  // ensuring the client receives functional data, but isn't a practice that
  // should be used for business logic
  it('should return photos', async () => {
    const caller = trpc.createCallerFactory(appRouter)
    const result = await caller({}).getPhotos()

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('farm')
    expect(result[0]).toHaveProperty('server')
    expect(result[0]).toHaveProperty('secret')
    expect(result[0]).toHaveProperty('title')
  })
})
