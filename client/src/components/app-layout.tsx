import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'

import { AppNavbar } from './app-navbar'

export function AppLayout() {
  return (
    <>
      <AppNavbar />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
