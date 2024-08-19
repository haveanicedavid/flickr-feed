import { render, screen } from '@testing-library/react'
import { redirect, useParams } from 'react-router-dom'
import { vi } from 'vitest'
import { trpc } from '../db/trpc'
import { createMockPhotos } from '../utils/test'
import TagPage from './tag'

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  redirect: vi.fn(),
}))

vi.mock('../db/trpc', () => ({
  trpc: {
    searchPhotos: {
      useQuery: vi.fn(),
    },
  },
}))

type SearchPhotosQueryResponse = ReturnType<typeof trpc.searchPhotos.useQuery>

describe('TagPage', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ tag: 'test-tag' })
  })

  it('redirects when tag is not provided', () => {
    vi.mocked(useParams).mockReturnValue({})
    render(<TagPage />)
    expect(vi.mocked(redirect)).toHaveBeenCalledWith('/')
  })

  it('renders loading state', () => {
    vi.mocked(trpc.searchPhotos.useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as SearchPhotosQueryResponse)

    render(<TagPage />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders error state', () => {
    const errorMessage = 'An error occurred'
    vi.mocked(trpc.searchPhotos.useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
    } as unknown as SearchPhotosQueryResponse)

    render(<TagPage />)
    expect(
      screen.getByText(`An error occurred: ${errorMessage}`)
    ).toBeInTheDocument()
  })

  it('renders ImageGallery when data is loaded', () => {
    const mockPhotos = createMockPhotos(1)
    vi.mocked(trpc.searchPhotos.useQuery).mockReturnValue({
      data: mockPhotos,
      isLoading: false,
      error: null,
    } as SearchPhotosQueryResponse)

    render(<TagPage />)
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
  })
})
