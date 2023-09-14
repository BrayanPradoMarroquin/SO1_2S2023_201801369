import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import docker from './img/docker.svg';

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <img src={docker} alt="docker" width="60" height="60" className="d-inline-block align-text-top" />
          <Navbar.Brand><h1>Modulos de Kernel</h1></Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="#home"><h2> Tiempo Real</h2></Nav.Link>
            <Nav.Link href="#features"><h2>Historial</h2></Nav.Link>
            <Nav.Link><h5>BHEPM - 201801369</h5></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>

    
  );
}

export default App;
