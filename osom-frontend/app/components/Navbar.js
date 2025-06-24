"use client";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const { toggleCart } = useCart();
  const router = useRouter();


  return (
    <Navbar expand="lg" className="bg-white py-3">
      <Container fluid>
        {/* OSOM Logo */}
        <Navbar.Brand href="http://localhost:3000" className="osom-logo">
          <Image
            src="/images/logo.png"
            alt="OSOM Logo"
            width={100}  // Adjust width for navbar size
            height={40}   // Maintain aspect ratio
            className="navbar-logo"
          />
        </Navbar.Brand>

        {/* Navbar Toggle (For Mobile) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Items */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex align-items-center nav-links">
            
            <Nav.Link href="#" className="text-dark fw-medium">Anime</Nav.Link>
            <Nav.Link href="#" className="text-dark fw-medium">Comics</Nav.Link>
            <Nav.Link href="#" className="text-dark fw-medium">Music</Nav.Link>
            <Nav.Link href="#" className="text-dark fw-medium">Movies</Nav.Link>
            <Nav.Link href="#" className="text-dark fw-medium">FAQ</Nav.Link>
            <Nav.Link href="#" className="text-dark fw-medium">About</Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex align-items-center flex-grow-1 mx-5">
            <FaSearch className="me-2 text-dark" size={18} />
            <input type="text" placeholder="Search..." className="search-bar" />
          </Form>

          {/* Log In & Cart */}
          <div className="d-flex align-items-center gap-4 cart-btn">
          <Button
            variant="white"
            className="login-btn"
            onClick={() => router.push("/signup")} // 👈 Navigate to /signup on click
          >
            <FaUserCircle className="text-dark" size={28} />
            <span className="text-dark fw-medium">Log In</span>
          </Button>
          <Button variant="white" onClick={toggleCart}>
            <FaShoppingCart className="text-dark" size={20} />
          </Button>
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
