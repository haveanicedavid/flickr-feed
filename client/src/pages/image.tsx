import { useParams } from 'react-router-dom'

import { ImageDetail } from '../components/image-detail'
import { LoadingSpinner } from '../components/loading-spinner'
import { trpc } from '../db/trpc'

export default function ImagePage() {
  const { id } = useParams<{ id: string }>()
  const { data: photo, isLoading, error } = trpc.getPhoto.useQuery({ id: id! })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>An error occurred: {error.message}</div>
  if (!photo) return <div>Photo not found</div>

  return <ImageDetail photo={photo} />
}
