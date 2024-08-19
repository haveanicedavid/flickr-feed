import { useState } from 'react'

import { ImageGallery } from '../components/image-gallery'
import { LoadingSpinner } from '../components/loading-spinner'
import { trpc } from '../db/trpc'

export default function HomePage() {
  const [forceRefresh, setForceRefresh] = useState(false)
  const {
    data: photos,
    isLoading,
    error,
    refetch,
  } = trpc.getPhotos.useQuery({ forceRefresh })

  // Bypass server caching and fetch new photos
  const handleRefresh = async () => {
    setForceRefresh(true)
    await refetch()
    setForceRefresh(false)
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>An error occurred: {error.message}</div>

  return <ImageGallery photos={photos} refreshPhotos={handleRefresh} />
}
