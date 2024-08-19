import type { Photo } from '../db/types'

export function createMockPhotos(count: number): Photo[] {
  return Array.from({ length: count }, (_, i) => _createMockPhoto(i + 1))
}

function _createMockPhoto(i: number): Photo {
  return {
    id: String(i),
    farm: i,
    server: `server${i}`,
    secret: `secret${i}`,
    title: `Photo ${i}`,
    owner: `owner${i}`,
    isfamily: 0,
    isfriend: 0,
    ispublic: 0,
  }
}
