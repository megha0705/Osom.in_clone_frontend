// app/signup/google/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoogleSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleGoogleSignup = () => {
    // Simulate Google signup
    const userData = { email, provider: "google" };
    localStorage.setItem("user", JSON.stringify(userData)); // Save session
    router.push("/"); // Redirect to home page after signup
  };

  return (
    <div className="container py-5 text-center">
      <h2>Google Sign Up</h2>
      <p>Enter your Google Email:</p>
      <input
        type="email"
        placeholder="yourname@gmail.com"
        className="form-control w-50 mx-auto"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-danger mt-3" onClick={handleGoogleSignup}>
        Complete Sign Up
      </button>
    </div>
  );
}
