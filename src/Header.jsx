import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";



function Header() {
  return (
    <>
      {/* Logo au-dessus */}


      {/* Navbar avec offcanvas */}
      <Navbar expand="lg" bg="light" className="shadow-sm">
        
        <Container>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"  // "start" = à gauche, "end" = à droite
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 gap-3">
                <Nav.Link as={Link} to="/">HOME</Nav.Link>
                <Nav.Link as={Link} to="/AddStudent">Add Student</Nav.Link>
                <Nav.Link as={Link} to="/ListStudent">View List</Nav.Link>
                <Nav.Link as={Link} to="/EditStudent/:id">Modifier Student</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
