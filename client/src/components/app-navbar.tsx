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
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              All Photos
            </Nav.Link>
          </Nav>
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
          <DarkModeToggle />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
