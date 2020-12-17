import React from "react"
import { useSelector } from "react-redux"
import LoggedIn from "../components/LoggedIn"
import { Row, Navbar, Nav } from "react-bootstrap"

const NavBar = () => {
  const user = useSelector((state) => state.user)
  return (
    <Row>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Blogister</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className=" d-flex justify-content-between"
        >
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={`/users/${user.id}`}>Profile</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
          <Nav>{user.name !== "" ? <LoggedIn /> : null}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </Row>
  )
}

export default NavBar
