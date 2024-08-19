import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Row className="justify-content-center">
      <Col md={6} className="text-center">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="mb-4">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go to Home Page
        </Button>
      </Col>
    </Row>
  )
}
