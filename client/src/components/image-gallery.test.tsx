import { render, screen } from '@testing-library/react'
import { ImageGallery } from './image-gallery'
import { trpc } from '../db/trpc'
import { vi, it, expect, describe } from 'vitest'
import type { FlickrPhoto } from '../../../server/src/types'

vi.mock('../db/trpc', () => ({
  trpc: {
    getPhotos: {
      useQuery: vi.fn(),
    },
  },
}))

type GetPhotosQuery = ReturnType<typeof trpc.getPhotos.useQuery>

describe('ImageGallery', () => {
  it('renders loading state', () => {
    vi.mocked(trpc.getPhotos.useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as GetPhotosQuery)

    render(<ImageGallery />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    vi.mocked(trpc.getPhotos.useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Test error'),
      // NOTE: We need to cast to GetPhotosQuery to avoid TS error related to
      // how tRPC returns errors (unrelated to UI logic)
    } as unknown as GetPhotosQuery)

    render(<ImageGallery />)
    expect(
      screen.getByText('An error occurred: Test error')
    ).toBeInTheDocument()
  })

  it('renders photos', () => {
    const photos: FlickrPhoto[] = mockPhotos(2)

    vi.mocked(trpc.getPhotos.useQuery).mockReturnValue({
      data: photos,
      isLoading: false,
      error: null,
    } as GetPhotosQuery)

    render(<ImageGallery />)
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
    expect(screen.getByText('Photo 2')).toBeInTheDocument()
  })
})

function mockPhotos(count: number): FlickrPhoto[] {
  return Array.from({ length: count }, (_, i) => mockPhoto(i))
}

function mockPhoto(i: number): FlickrPhoto {
  return {
    id: String(i),
    farm: i,
    server: `server${i}`,
    secret: `secret${i}`,
    title: `Photo ${i}`,
    owner: `owner${i}`,
    isfamily: 0,
    isfriend: 0,
    ispublic: 0,
  }
}
