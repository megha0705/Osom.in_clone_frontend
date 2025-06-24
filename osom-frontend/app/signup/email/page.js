// app/signup/email/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignup = () => {
    // Save user signup info (in real world, you send to backend)
    const userData = { email, password, provider: "email" };
    localStorage.setItem("user", JSON.stringify(userData)); // Save session
    router.push("/"); // Redirect to home page after signup
  };

  return (
    <div className="container py-5 text-center">
      <h2>Email Sign Up</h2>
      <div className="w-50 mx-auto">
        <input
          type="email"
          placeholder="Email"
          className="form-control my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control my-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={handleEmailSignup}>
          Complete Sign Up
        </button>
      </div>
    </div>
  );
}
