import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { trpc } from '../db/trpc';

export function ImageGallery() {
  const { data: photos, isLoading, error } = trpc.getPhotos.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {photos?.map((photo) => (
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
  );
}
