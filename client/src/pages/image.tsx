import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'

import { LoadingSpinner } from '../components/loading-spinner'
import { trpc } from '../db/trpc'
import { getFlickrImageSrc } from '../utils/image'

export default function ImagePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: photo, isLoading, error } = trpc.getPhoto.useQuery({ id: id! })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>An error occurred: {error.message}</div>
  if (!photo) return <div>Photo not found</div>

  return (
    <div className="container mt-4">
      <img
        src={getFlickrImageSrc(photo, 'b')}
        alt={photo.title._content}
        className="img-fluid mb-3"
      />
      <h2>{photo.title._content}</h2>
      <div className="mb-3">
        {photo.tags.tag.map((tag) => (
          <Button
            key={tag.id}
            variant="outline-primary"
            className="me-2 mb-2"
            onClick={() => navigate(`/tags/${tag._content}`)}
          >
            {tag.raw}
          </Button>
        ))}
      </div>
    </div>
  )
}
