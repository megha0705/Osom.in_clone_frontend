// app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    // In real life, validate with backend
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email === email) {
      alert("Login successful!");
      router.push("/");
    } else {
      alert("User not found. Please sign up.");
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2>Login</h2>
      <div className="w-50 mx-auto">
        <input
          type="email"
          placeholder="Enter your Email"
          className="form-control my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-dark mt-3" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
