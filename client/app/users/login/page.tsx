"use client";
import { useState } from "react";
import { authClient } from "@/auth-client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        console.error("Login failed:", error);
        return;
      }

      console.log("Login successful:", data);
      // Redirect or update UI
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
