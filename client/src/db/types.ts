import type { ApiOutput } from '../../../server/src/types'

type GetPhotosResponse = ApiOutput['getPhotos']

/**
 * NOTE: This is overkill for the purpose of this project. It would make more
 * sense in this use case to just import `FlickrPhoto` from the server and use
 * that in the client, but I wanted to show why I like tRPC: the ability to
 * directly access typed data from the server responses is really nice in
 * larger projects with more complicated endpoints.
 */
export type Photo = GetPhotosResponse[0]
