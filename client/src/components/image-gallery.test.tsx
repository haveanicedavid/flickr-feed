import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { createMockPhotos } from '../utils/test'
import { ImageGallery } from './image-gallery'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

const refreshPhotos = () => void null

describe('ImageGallery', () => {
  it('renders photos', async () => {
    const photos = createMockPhotos(2)

    render(<ImageGallery photos={photos} refreshPhotos={refreshPhotos} />)
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
    expect(screen.getByText('Photo 2')).toBeInTheDocument()

    // Wait for images to load
    const images = await screen.findAllByAltText(
      /Photo \d/,
      {},
      { timeout: 3000 }
    )
    expect(images).toHaveLength(2)

    // Check if images are present but hidden
    images.forEach((img) => {
      expect(img).toBeInTheDocument()
      expect(img).toHaveStyle({ display: 'none' })
    })
  })

  it('renders no photos when the array is empty', () => {
    render(<ImageGallery photos={[]} refreshPhotos={refreshPhotos} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
