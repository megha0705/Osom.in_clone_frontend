// app/login/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../(main)/components/AuthContext";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter all fields.");
      return;
    }
    login(username);
    router.push("/");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4">Login</h2>
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" onClick={handleLogin}>
              Login
            </Button>{" "}
            <Button variant="dark" onClick={() => router.push("/signup")}>
              Create Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
