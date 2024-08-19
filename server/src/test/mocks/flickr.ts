import type { FlickrPhoto, FlickrPhotoInfo } from '../../types'

let callCount = 0

export const mockFlickr = jest.fn((method: string, _params: any) => {
  callCount++

  switch (method) {
    case 'flickr.photos.getRecent':
      return Promise.resolve({
        photos: {
          photo: createMockFlickrPhotos(2),
        },
      })
    case 'flickr.photos.search':
      return Promise.resolve({
        photos: {
          photo: createMockFlickrPhotos(2),
        },
      })
    case 'flickr.photos.getInfo':
      return Promise.resolve({
        photo: createMockFlickrPhotoInfo({
          id: '123',
          farm: 5,
          server: 'server5',
          secret: 'secret5',
        }),
      })
    default:
      throw new Error(`Unexpected method: ${method}`)
  }
})

let photoId = 1

export function createMockFlickrPhotos(count: number): Partial<FlickrPhoto>[] {
  return Array.from({ length: count }, () => ({
    id: String(photoId++),
    farm: Math.floor(Math.random() * 10) + 1,
    server: `server${Math.floor(Math.random() * 100)}`,
    secret: `secret${Math.random().toString(36).substring(7)}`,
    title: `Photo ${photoId}`,
  }))
}

export function createMockFlickrPhotoInfo(
  photo: Partial<FlickrPhoto>
): Partial<FlickrPhotoInfo> {
  return {
    ...photo,
    title: {
      _content: photo.title || 'Photo Info',
    },
    owner: {
      nsid: 'testuser123',
      username: 'testuser',
      realname: 'Test User',
      location: 'Test Location',
      iconserver: '1',
      iconfarm: 1,
    },
    description: {
      _content: 'Test description',
    },
    tags: {
      tag: [
        {
          id: '1',
          author: 'testuser123',
          authorname: 'Test User',
          raw: 'nature',
          _content: 'nature',
          machine_tag: 0,
        },
        {
          id: '2',
          author: 'testuser123',
          authorname: 'Test User',
          raw: 'landscape',
          _content: 'landscape',
          machine_tag: 0,
        },
      ],
    },
  }
}
