import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { trpc } from '../db/trpc'
import { createMockPhotos } from '../utils/test'
import HomePage from './home'

vi.mock('../db/trpc', () => ({
  trpc: {
    getPhotos: {
      useQuery: vi.fn(),
    },
  },
}))

type GetPhotosQueryResponse = ReturnType<typeof trpc.getPhotos.useQuery>

describe('HomePage', () => {
  it('renders loading state', () => {
    vi.mocked(trpc.getPhotos.useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as GetPhotosQueryResponse)

    render(<HomePage />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders error state', () => {
    const errorMessage = 'An error occurred'
    vi.mocked(trpc.getPhotos.useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
      // NOTE: We need to cast to GetPhotosResponse because TypeScript doesn't
      // know that we're mocking the function and tRPC has different response
      // data in the case of errors
    } as unknown as GetPhotosQueryResponse)

    render(<HomePage />)
    expect(
      screen.getByText(`An error occurred: ${errorMessage}`)
    ).toBeInTheDocument()
  })

  it('renders ImageGallery when data is loaded', () => {
    const mockPhotos = createMockPhotos(1)
    vi.mocked(trpc.getPhotos.useQuery).mockReturnValue({
      data: mockPhotos,
      isLoading: false,
      error: null,
    } as GetPhotosQueryResponse)

    render(<HomePage />)
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
  })
})
