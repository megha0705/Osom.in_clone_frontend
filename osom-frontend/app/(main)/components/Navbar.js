"use client";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useProductContext } from "./ProductContext"; // ✅ context for category + search

export default function NavigationBar() {
  const { toggleCart } = useCart();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { setSelectedCategory, setSearchQuery, searchQuery } =
    useProductContext(); // ✅ extract searchQuery as well

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedCategory(null); // clear category when searching
  };

  return (
    <Navbar expand="lg" className="bg-white py-3">
      <Container fluid>
        {/* OSOM Logo */}
        <Navbar.Brand
          href="https://osom-in-clone-frontend.vercel.app/"
          className="osom-logo"
        >
          <Image
            src="/images/logo.png"
            alt="OSOM Logo"
            width={100}
            height={40}
            className="navbar-logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Category Links */}
          <Nav>
            <Nav.Link onClick={() => setSelectedCategory("Anime")}>
              Anime
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedCategory("Comics")}>
              Comics
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedCategory("Music")}>
              Music
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedCategory("Movies")}>
              Movies
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
            >
              All
            </Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex align-items-center flex-grow-1 mx-5">
            <FaSearch className="me-2 text-dark" size={18} />
            <input
              type="text"
              placeholder="Search by name, category, description..."
              className="search-bar text-dark"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form>

          {/* User Auth & Cart */}
          <div className="d-flex align-items-center gap-4 cart-btn">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="white"
                  className="d-flex align-items-center gap-2 text-dark fw-medium"
                >
                  <FaUserCircle className="text-dark" size={28} />
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant="white"
                className="login-btn"
                onClick={() => router.push("/login")}
              >
                <FaUserCircle className="text-dark" size={28} />
                <span className="text-dark fw-medium">Log In</span>
              </Button>
            )}
            <Button variant="white" onClick={toggleCart}>
              <FaShoppingCart className="text-dark" size={20} />
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
