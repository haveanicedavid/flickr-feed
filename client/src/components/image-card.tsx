import Card from 'react-bootstrap/Card'

import type { Photo } from '../db/types'
import { getFlickrImageSrc } from '../utils/image'

type Props = {
  photo: Photo
  viewType: 'grid' | 'list'
}

export function ImageCard({ photo, viewType }: Props) {
  return (
    <Card className={viewType === 'grid' ? 'w-100' : 'flex-row'}>
      <Card.Img
        variant={viewType === 'grid' ? 'top' : 'left'}
        src={getFlickrImageSrc(photo)}
        alt={photo.title}
        style={{
          objectFit: 'cover',
          width: viewType === 'grid' ? '100%' : '150px',
          height: viewType === 'grid' ? 'auto' : '150px',
        }}
      />
      <Card.Body>
        <Card.Title>{photo.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}
