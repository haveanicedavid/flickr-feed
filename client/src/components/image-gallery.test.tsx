import { render, screen } from '@testing-library/react'

import { createMockPhotos } from '../utils/test'
import { ImageGallery } from './image-gallery'

describe('ImageGallery', () => {
  it('renders photos', () => {
    const photos = createMockPhotos(2)

    render(<ImageGallery photos={photos} />)
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
    expect(screen.getByText('Photo 2')).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('renders no photos when the array is empty', () => {
    render(<ImageGallery photos={[]} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
