import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'

import type { Photo } from '../db/types'
import { getFlickrImageSrc } from '../utils/image'

type Props = {
  photo: Photo
  viewType: 'grid' | 'list'
}

export function ImageCard({ photo, viewType }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const imgStyle = {
    objectFit: 'cover' as const,
    width: viewType === 'grid' ? '100%' : '150px',
    height: viewType === 'grid' ? '200px' : '150px',
    borderRadius: viewType === 'grid' ? '8px 8px 0 0' : '8px 0 0 8px',
  }

  return (
    <Card className={`${viewType === 'grid' ? 'w-100' : 'flex-row'} mb-3`}>
      <div style={imgStyle}>
        {!imageLoaded && (
          <Placeholder as="div" animation="glow" className="w-100 h-100">
            <Placeholder xs={12} className="h-100" />
          </Placeholder>
        )}
        <Card.Img
          variant={viewType === 'grid' ? 'top' : 'left'}
          src={getFlickrImageSrc(photo)}
          alt={photo.title}
          style={{
            ...imgStyle,
            display: imageLoaded ? 'block' : 'none',
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <Card.Body>
        <Card.Title>{photo.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

