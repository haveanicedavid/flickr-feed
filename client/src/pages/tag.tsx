import { redirect, useParams } from 'react-router-dom'

import { ImageGallery } from '../components/image-gallery'
import { LoadingSpinner } from '../components/loading-spinner'
import { trpc } from '../db/trpc'

export default function TagPage() {
  const { tag } = useParams<{ tag: string }>()
  if (!tag) {
    redirect('/')
    return null
  }

  const { data: photos, isLoading, error } = trpc.searchPhotos.useQuery({ tag })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>An error occurred: {error.message}</div>

  return <ImageGallery photos={photos} />
}
