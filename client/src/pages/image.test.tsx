import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { useNavigate, useParams } from 'react-router-dom'

import { trpc } from '../db/trpc'
import ImagePage from './image'

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}))

vi.mock('../db/trpc', () => ({
  trpc: {
    getPhoto: {
      useQuery: vi.fn(),
    },
  },
}))

type GetPhotoQueryResponse = ReturnType<typeof trpc.getPhoto.useQuery>

describe('ImagePage', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: '123' })
    vi.mocked(useNavigate).mockReturnValue(vi.fn())
  })

  it('renders loading state', () => {
    vi.mocked(trpc.getPhoto.useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as GetPhotoQueryResponse)

    render(<ImagePage />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders error state', () => {
    const errorMessage = 'An error occurred'
    vi.mocked(trpc.getPhoto.useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
    } as unknown as GetPhotoQueryResponse)

    render(<ImagePage />)
    expect(
      screen.getByText(`An error occurred: ${errorMessage}`)
    ).toBeInTheDocument()
  })

  it('renders "Photo not found" when no photo data', () => {
    vi.mocked(trpc.getPhoto.useQuery).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    } as GetPhotoQueryResponse)

    render(<ImagePage />)
    expect(screen.getByText('Photo not found')).toBeInTheDocument()
  })

  it('renders photo details when data is loaded', () => {
    const mockPhoto = {
      id: '123',
      title: { _content: 'Test Photo' },
      tags: {
        tag: [
          { id: '1', _content: 'tag1', raw: 'tag1' },
          { id: '2', _content: 'tag2', raw: 'tag2' },
        ],
      },
    }

    vi.mocked(trpc.getPhoto.useQuery).mockReturnValue({
      data: mockPhoto,
      isLoading: false,
      error: null,
    } as GetPhotoQueryResponse)

    render(<ImagePage />)
    expect(screen.getByAltText('Test Photo')).toBeInTheDocument()
    expect(screen.getByText('Test Photo')).toBeInTheDocument()
    expect(screen.getByText('tag1')).toBeInTheDocument()
    expect(screen.getByText('tag2')).toBeInTheDocument()
  })
})
