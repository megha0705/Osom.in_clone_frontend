// app/signup/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../(main)/components/AuthContext";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    signup(username);
    router.push("/");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4">Sign Up</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" onClick={handleSignup}>
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
