// client/src/Login.jsx
import React, { useState } from "react";

export default function Login({ onSuccess, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ⭐ IMPORTANT: Update to your actual backend URL
  const BACKEND = "https://myportfolio-backend.onrender.com";

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
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setMessage(data.error || "Invalid credentials");
        return;
      }

      const user = data.user;
      setMessage("Login successful!");

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.token || "");
      }

      if (setRole && user?.role) {
        setRole(user.role);
        localStorage.setItem("role", user.role);
      }

      if (onSuccess && user) {
        onSuccess(user);
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
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
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "1.5rem",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "black",
            color: "white",
            padding: "12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
