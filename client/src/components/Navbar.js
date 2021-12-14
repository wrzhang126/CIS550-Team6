import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
import { Button } from "antd";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Navigationbar() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            {" "}
            <img
              width="30px"
              height="30px"
              style={{ borderRadius: "15px" }}
              src="logo-whitebg.svg"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Button
                type="link"
                onClick={() =>
                  navigate("/search/artists", { from: "SearchBySong" })
                }
                style={{ marginRight: "10px" }}
              >
                Search Artists
              </Button>
              <Button
                type="link"
                onClick={() =>
                  navigate("/search/songs", { from: "SearchByArtist" })
                }
                style={{ marginRight: "10px" }}
              >
                Search Songs
              </Button>
              <Button
                type="link"
                onClick={() =>
                  navigate("/ranking", {
                    from: ["SearchByArtist", "SearchBySong"],
                  })
                }
              >
                Top Artists
              </Button>
              <Button type="link" onClick={() => navigate("/boringpage")}>
                Top Songs
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
