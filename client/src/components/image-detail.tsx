import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import { useNavigate } from 'react-router-dom'

import type { PhotoInfo } from '../db/types'
import { getFlickrImageSrc } from '../utils/image'

type Props = {
  photo: PhotoInfo
}

export function ImageDetail({ photo }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const navigate = useNavigate()

  return (
    <Card className="border-0">
      <div className="position-relative" style={{ height: '500px' }}>
        {!imageLoaded && (
          <Placeholder as="div" animation="glow" className="w-100 h-100">
            <Placeholder xs={12} className="h-100" />
          </Placeholder>
        )}
        <Card.Img
          variant="top"
          src={getFlickrImageSrc(photo, 'b')}
          alt={photo.title._content}
          className="img-fluid"
          style={{
            objectFit: 'contain',
            maxHeight: '500px',
            width: '100%',
            display: imageLoaded ? 'block' : 'none',
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title>{photo.title._content}</Card.Title>
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
      </Card.Body>
    </Card>
  )
}
