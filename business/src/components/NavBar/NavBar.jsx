import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./NavBar.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from "../assets/logo.png";

const MyNavbar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/home">
          <img src={logo} className="logo" alt="Logo"/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav.Link
              href="/"
              active={activeLink === "Client"}
              onClick={() => {
                handleSetActive("Client");
                window.location.href = "Client.jsp";
              }}
            >
              Client
            </Nav.Link>

            <Nav.Link
              href="#Produit"
              active={activeLink === "Produit"}
              onClick={() => handleSetActive("Produit")}
            >
              Produit
            </Nav.Link>

            <Nav.Link
              href="#devis"
              active={activeLink === "devis"}
              onClick={() => handleSetActive("devis")}
            >
              Devis
            </Nav.Link>

            <NavDropdown
              title="Logistique"
              id="basic-nav-dropdown"
              active={activeLink === "Logistique"}
            >
              <NavDropdown.Item href="#GestionAgents">Gestion des agents</NavDropdown.Item>
              <NavDropdown.Item href="#GestionTransporteur">Gestion des transporteurs</NavDropdown.Item>
              <NavDropdown.Item href="#GestionAgence">Gestion des agences</NavDropdown.Item>
            </NavDropdown>

            {/* --- Icône Panier --- */}
            <Nav.Link
              href="#panier"
              className="position-relative"
              onClick={() => handleSetActive("panier")}
            >
              <i className="fas fa-shopping-cart fa-lg"></i>

            
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
