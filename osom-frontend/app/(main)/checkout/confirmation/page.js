"use client";
import { useEffect, useState } from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function OrderConfirmationPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/"); // Redirect to the homepage after 5 seconds
      }, 1000);
    }, 10000); // Show confirmation for 5 seconds
  }, []);

  return (
    <Container className="py-5 text-center">
      <h2>Your Order has been Placed! 🎉</h2>
      <Alert variant="success" className="mt-4">
        Thank you for your purchase! We are processing your order.
      </Alert>
      <div className="mt-4">
        {isRedirecting ? (
          <Button variant="link" disabled>
            Redirecting to homepage...
          </Button>
        ) : (
          <p>Redirecting to the homepage in 10 seconds...</p>
        )}
      </div>
    </Container>
  );
}
