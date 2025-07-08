// app/checkout/page.js
"use client";
import { useCart } from "../components/CartContext";
import { Button, Container, Form, Row, Col, Image, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, buyNowItem, setBuyNowItem } = useCart(); // ✅ updated
  const router = useRouter();

  const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;
  const total = itemsToCheckout.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    setBuyNowItem(null); // ✅ Clear after use
    router.push("/checkout/payment");
  };

  return (
    <Container className="py-5">
      <h2 className="mb-5 text-center">Checkout</h2>
      <Row>
        <Col lg={6} md={12} className="mb-4">
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h4 className="mb-3">Shipping Information</h4>
              <Form>
                <Row className="mb-3">
                  <Col><Form.Control placeholder="First Name" required /></Col>
                  <Col><Form.Control placeholder="Last Name" required /></Col>
                </Row>
                <Form.Control type="text" placeholder="Phone" className="mb-3" required />
                <Form.Control type="text" placeholder="Address" className="mb-3" required />
                <Row className="mb-3">
                  <Col>
                    <Form.Control as="select" required>
                      <option>Country/Region</option>
                      <option>India</option>
                    </Form.Control>
                  </Col>
                  <Col>
                    <Form.Control as="select" required>
                      <option>City</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                      <option>Kolkata</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Control as="select" required>
                      <option>State</option>
                      <option>Karnataka</option>
                      <option>Delhi</option>
                      <option>West Bengal</option>
                    </Form.Control>
                  </Col>
                  <Col>
                    <Form.Control type="text" placeholder="Zip / Postal Code" required />
                  </Col>
                </Row>
                <h4 className="mb-3">Payment Method</h4>
                <Form.Check
                  type="radio"
                  label="Credit Card"
                  name="paymentMethod"
                  value="creditCard"
                  defaultChecked
                />
                <Button
                  variant="success"
                  className="mt-3 w-100"
                  onClick={handlePlaceOrder} // ✅ uses custom function
                >
                  Place Order and Pay
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} md={12}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h4 className="mb-3">Items in Your Cart</h4>
              {itemsToCheckout.map((item, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
                  <div className="d-flex align-items-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="me-3 rounded"
                    />
                    <div>
                      <div>{item.title}</div>
                      <div>{item.quantity} x ${item.price}</div>
                    </div>
                  </div>
                  <div>${item.price * item.quantity}</div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <div>Subtotal</div>
                <div>${total.toFixed(2)}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
