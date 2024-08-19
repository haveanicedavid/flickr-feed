import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export function AppLayout() {
  const [searchTag, setSearchTag] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTag.trim()) {
      navigate(`/tags/${encodeURIComponent(searchTag.trim())}`)
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
