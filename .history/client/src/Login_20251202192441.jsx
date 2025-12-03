// client/src/Login.jsx
import React, { useState } from "react";

export default function Login({ onSuccess }) {
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
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setMessage(data.error || "Invalid credentials");
        return;
      }

      // Save user and token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setMessage("Login successful! 🎉");

      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setMessage("Server error. Try again.");
    }
  };

  return (
    <div style={{ padding: "3rem 1rem", maxWidth: "450px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem" }}>Sign In</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={btnStyle}>
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

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "1.2rem",
  borderRadius: "6px",
  border: "1px solid #aaa",
};

const btnStyle = {
  width: "100%",
  background: "black",
  color: "white",
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
};
