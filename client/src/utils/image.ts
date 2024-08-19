import type { Photo } from '../db/types'

/**
 * Get the image source URL for a Flickr photo object
 *
 * @param photo - Flickr photo object
 * @returns - Image source URL
 */
export function getFlickrImageSrc({ farm, server, id, secret }: Photo) {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`
}
