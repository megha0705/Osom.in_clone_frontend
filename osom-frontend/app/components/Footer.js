import { Container, Row, Col } from "react-bootstrap";
// import styles from "@/styles/globals.css"; // Ensure styles are included

export default function Footer() {
  return (
    <footer className="footer">
      {/* First Row - Bold Offer Text */}
      <Container fluid className="text-center py-3 offer-text">
        <p>
          <strong>Grab 2 Tees, Unlock Free Shipping & Save ₹51</strong>
        </p>
        <p>
          <strong>BUY 2, GET ₹50 OFF – Use Code: TEES50</strong>
        </p>
        <p>
          <strong>BUY 4, GET ₹200 OFF – Use Code: TEES200</strong>
        </p>
      </Container>

      {/* Second Row - Footer Links */}
      <Container fluid className="text-center py-2 footer-links">
        <Row className="align-items-center">
          <Col xs="auto" className="footer-left">© OSOM</Col>
          <Col xs="auto">Store Policy</Col>
          <Col xs="auto">Shipping and Returns</Col>
          <Col xs="auto">About Us</Col>
          <Col xs="auto">FAQ</Col>
          <Col xs="auto">Size Chart</Col>
          <Col xs="auto" className="footer-right">INDIA</Col>
        </Row>
      </Container>
    </footer>
  );
}
