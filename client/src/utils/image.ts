import type { Photo, PhotoInfo } from '../db/types'

/**
 * Get the image source URL for a Flickr photo object
 *
 * @param photo - Flickr photo object
 * @param size - Size of the image (default: 'q' for thumbnail)
 * @returns - Image source URL
 */
export function getFlickrImageSrc(data: Photo | PhotoInfo, size: string = 'q') {
  const { farm, server, id, secret } = data
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`
}
