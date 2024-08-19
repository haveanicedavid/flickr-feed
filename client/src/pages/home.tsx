import { trpc } from '../db/trpc'
import { ImageGallery } from '../components/image-gallery'
import { LoadingSpinner } from '../components/loading-spinner'

export default function HomePage() {
  const { data: photos, isLoading, error } = trpc.getPhotos.useQuery()

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>An error occurred: {error.message}</div>

  return <ImageGallery photos={photos} />
}
