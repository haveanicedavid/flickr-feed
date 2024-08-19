import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { createMockPhotos } from '../utils/test'
import { ImageGallery } from './image-gallery'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

const refreshPhotos = vi.fn()

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

  it('switches between grid and list views', async () => {
    const photos = createMockPhotos(2)
    render(<ImageGallery photos={photos} refreshPhotos={refreshPhotos} />)

    // Check initial grid view
    expect(screen.getByText('View: Grid')).toBeInTheDocument()
    const initialColumns = screen.getAllByTestId('photo-column')
    expect(initialColumns[0]).toHaveClass('d-flex')

    // Switch to list view
    await act(async () => {
      fireEvent.click(screen.getByText('View: Grid'))
    })
    await act(async () => {
      fireEvent.click(screen.getByText('List'))
    })

    expect(screen.getByText('View: List')).toBeInTheDocument()
    const listColumns = screen.getAllByTestId('photo-column')
    expect(listColumns[0]).not.toHaveClass('d-flex')

    // Switch back to grid view
    await act(async () => {
      fireEvent.click(screen.getByText('View: List'))
    })
    await act(async () => {
      fireEvent.click(screen.getByText('Grid'))
    })

    expect(screen.getByText('View: Grid')).toBeInTheDocument()
    const gridColumns = screen.getAllByTestId('photo-column')
    expect(gridColumns[0]).toHaveClass('d-flex')
  })

  it('calls refreshPhotos when Refresh Photos button is clicked', () => {
    const photos = createMockPhotos(2)
    render(<ImageGallery photos={photos} refreshPhotos={refreshPhotos} />)

    fireEvent.click(screen.getByText('Refresh Photos'))
    expect(refreshPhotos).toHaveBeenCalledTimes(1)
  })
})
