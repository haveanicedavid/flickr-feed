import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row'

import type { Photo } from '../db/types'
import { ImageCard } from './image-card'

type Props = {
  photos?: Photo[]
}

type ViewType = 'grid' | 'list'

export function ImageGallery({ photos }: Props) {
  const [viewType, setViewType] = useState<ViewType>('grid')

  const handleViewChange = (selectedViewType: ViewType) => {
    setViewType(selectedViewType)
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-view-type">
            View: {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleViewChange('grid')}>
              Grid
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleViewChange('list')}>
              List
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row
        xs={1}
        md={viewType === 'grid' ? 2 : 1}
        lg={viewType === 'grid' ? 3 : 1}
        className="g-4"
      >
        {photos?.map((photo) => (
          <Col key={photo.id} className={viewType === 'grid' ? 'd-flex' : ''}>
            <ImageCard photo={photo} viewType={viewType} />
          </Col>
        ))}
      </Row>
    </>
  )
}
