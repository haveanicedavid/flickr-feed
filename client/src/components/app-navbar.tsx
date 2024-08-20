import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'

import { DarkModeToggle } from './dark-mode-toggle'

export function AppNavbar() {
  const [searchTag, setSearchTag] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTag.trim()) {
      navigate(`/tags/${encodeURIComponent(searchTag.trim())}`)
    }
  }

  return (
    <Navbar expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Flickr Feed
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="w-100 d-flex flex-column flex-lg-row">
            <div className="d-flex justify-content-between flex-grow-1 align-items-center mb-2 mb-lg-0">
              <Nav>
                <Nav.Link as={Link} to="/">
                  All Photos
                </Nav.Link>
              </Nav>
              <DarkModeToggle className="d-lg-none" />
            </div>
            <Form onSubmit={handleSearch} className="d-flex">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search tags..."
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                />
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </InputGroup>
            </Form>
            <DarkModeToggle className="d-none d-lg-block ms-lg-3" />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
