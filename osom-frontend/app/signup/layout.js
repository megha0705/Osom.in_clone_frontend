"use client";

import { Button, Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpLayout({ children }) {
  const router = useRouter();

  const handleGoogleSignUp = () => {
    router.push("/signup/google");
  };

  const handleEmailSignUp = () => {
    router.push("/signup/email");
  };

  return (
    <Container className="py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <h2 className="mb-4">Sign Up</h2>

      {/* Sign Up Buttons */}
      <div className="d-flex flex-column gap-3" style={{ width: "300px" }}>
        <Button variant="danger" onClick={handleGoogleSignUp}>
          Sign up with Google
        </Button>
        <Button variant="primary" onClick={handleEmailSignUp}>
          Sign up with Email
        </Button>
      </div>

      {/* Link to Login */}
      <div className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-primary">
          Log in
        </Link>
      </div>

      {/* Here the page content will be injected */}
      {children}
    </Container>
  );
}
