import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { ImageGallery } from './components/image-gallery'

function App() {
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Flickr Image Gallery</h1>
      <ImageGallery />
    </Container>
  )
}

export default App
