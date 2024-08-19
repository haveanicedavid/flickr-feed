import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

export function LoadingSpinner() {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <Spinner animation="border" role="status" variant="primary" />
    </Container>
  )
}
