import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import docker from '../img/docker.svg';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={docker}
              width="75"
              height="75"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='/'>SO1 - 2S2023</Nav.Link>
            <Nav.Link href="/monitor">Tiempo Real</Nav.Link>
            <Nav.Link href="/historial">Historial</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Maquina No."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Monitorear</Button>
          </Form>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default Layout