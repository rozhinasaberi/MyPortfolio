import React, { useState } from "react";

export default function Login({ onSuccess, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const BACKEND = "https://myportfolio-1-adrz.onrender.com/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${BACKEND}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Invalid credentials");
        return;
      }

      const user = data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", data.token || "");

      if (setRole && user.role) {
        setRole(user.role);
        localStorage.setItem("role", user.role);
      }

      if (onSuccess) onSuccess(user);
    } catch (err) {
      console.error(err);
      setMessage("Server error, please try again.");
    }
  };

  return (
    <div style={{ padding: "3rem 1rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem" }}>Sign In</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
