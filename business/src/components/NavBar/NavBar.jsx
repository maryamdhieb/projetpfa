import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./NavBar.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from "../assets/logo.png";

const MyNavbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.name) setUserName(user.name);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/Connexion";
  };
  const [cartCount, setCartCount] = useState(
  Number(sessionStorage.getItem("cartCount")) || 0
);

// Écouter les changements du panier
useEffect(() => {
  const interval = setInterval(() => {
    setCartCount(Number(sessionStorage.getItem("cartCount")) || 0);
  }, 500);

  return () => clearInterval(interval);
}, []);


  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`modern-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand href="/home" className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="modern-navbar-nav" className="border-0">
          <i className="fas fa-bars fa-lg"></i>
        </Navbar.Toggle>

        <Navbar.Collapse id="modern-navbar-nav">
          <Nav className="mx-auto align-items-center"> {/* Centré */}
            <Nav.Link
              href="/"
              className={`nav-link-modern ${activeLink === "Client" ? "active" : ""}`}
              onClick={() => {
                setActiveLink("Client");
                window.location.href = "Client.jsp";
              }}
            >
              Client
            </Nav.Link>

            <Nav.Link
              href="#Produit"
              className={`nav-link-modern ${activeLink === "Produit" ? "active" : ""}`}
              onClick={() => setActiveLink("Produit")}
            >
              Produit
            </Nav.Link>

            <Nav.Link
              href="#devis"
              className={`nav-link-modern ${activeLink === "devis" ? "active" : ""}`}
              onClick={() => setActiveLink("devis")}
            >
              Devis
            </Nav.Link>

            <NavDropdown
              title="Logistique"
              id="logistique-dropdown"
              className="nav-dropdown-modern"
              show={activeLink === "Logistique"}
            >
              <NavDropdown.Item href="#GestionAgents">Gestion des agents</NavDropdown.Item>
              <NavDropdown.Item href="#GestionTransporteur">Gestion des transporteurs</NavDropdown.Item>
              <NavDropdown.Item href="#GestionAgence">Gestion des agences</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right side - Icons */}
          <Nav className="align-items-center gap-3">
            <Nav.Link href="/panier" className="position-relative">
              <i className="fas fa-shopping-cart fa-lg"></i>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Nav.Link>


            <NavDropdown
              title={
                <div className="user-dropdown-title">
                  <i className="fas fa-user-circle fa-xl"></i>
                  <span className="ms-2 d-none d-lg-inline">{userName || "Compte"}</span>
                </div>
              }
              id="user-dropdown"
              align="end"
              className="user-dropdown"
            >
              <NavDropdown.Item href="/profile">
                <i className="fas fa-user me-2"></i> Profil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;