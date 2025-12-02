// client/src/Login.jsx
import React, { useState } from "react";

export default function Login({ onSuccess, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/auth/signin", {
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

      // success
      const user = data.user;
      setMessage("Login successful!");

      // save user in localStorage (for dashboard etc.)
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // set role if parent passed setter
      if (setRole && user && user.role) {
        setRole(user.role);
        localStorage.setItem("role", user.role);
      }

      // tell parent (App.jsx) login worked
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
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            background: "black",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem", color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
