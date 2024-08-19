import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

interface Photo {
  id: string
  owner: string
  secret: string
  server: string
  farm: number
  title: string
}

export function ImageGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/photos')
      .then((response) => response.json())
      .then((data) => setPhotos(data.photos.photo))
      .catch((error) => console.error('Error fetching photos:', error))
  }, [])

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {photos.map((photo) => (
        <Col key={photo.id}>
          <Card>
            <Card.Img
              variant="top"
              src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
              alt={photo.title}
            />
            <Card.Body>
              <Card.Title>{photo.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
