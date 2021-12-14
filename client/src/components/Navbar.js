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
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Tbd</Navbar.Brand>
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
                Search by Artist
              </Button>
              <Button
                type="link"
                onClick={() => navigate("/songs", { from: "SearchByArtist" })}
                style={{ marginRight: "10px" }}
              >
                Search by Song
              </Button>
              <Button
                type="link"
                onClick={() =>
                  navigate("/ranking", {
                    from: ["SearchByArtist", "SearchBySong"],
                  })
                }
              >
                Ranking
              </Button>
              <Button type="link" onClick={() => navigate("/boringpagge")}>
                Boring page
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
