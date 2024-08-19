import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { getFlickrImageSrc } from '../utils/image';

import type { Photo } from '../db/types';

type Props = {
  photos?: Photo[];
};

export function ImageGallery({ photos }: Props) {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {photos?.map((photo) => (
        <Col key={photo.id} className="d-flex">
          <Card className="w-100">
            <Card.Img
              variant="top"
              src={getFlickrImageSrc(photo)}
              alt={photo.title}
              style={{ objectFit: 'cover' }}
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
