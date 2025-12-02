// client/src/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "./api";

export default function Login({ onLogin, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/api/auth/signin`, {
        email,
        password,
      });

      onLogin(res.data.user, res.data.token);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn auth-btn">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <button type="button" onClick={goSignup} className="link-btn">
            Sign Up
          </button>
        </p>
      </div>
    </section>
  );
}
