import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function Navigationbar() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Tbd</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Button style={{marginRight: "10px"}}>Search by Artist</Button>
            <Button variant="outline-primary" onClick={()=> navigate('/searchbysong',{from: "SearchByArtist"})}>Search by Song</Button>
          </Nav>
          <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search by artist"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-primary">Search</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
   
  );
}
