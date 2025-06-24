import { Container, Row, Col, Card } from 'react-bootstrap';

export default function ProductShowcase() {
  return (
    <Container className="my-5">
      {/* <Row>
        {[1, 2, 3].map((item) => (
          <Col md={4} key={item}>
            <Card className="shadow">
              <Card.Img variant="top" src={`https://via.placeholder.com/300?text=Product+${item}`} />
              <Card.Body>
                <Card.Title>Product {item}</Card.Title>
                <Card.Text>High-quality product with amazing features.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}
    </Container>
  );
}
