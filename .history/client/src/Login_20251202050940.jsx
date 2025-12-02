// client/src/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "./api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/auth/signin`, {
        email,
        password,
      });

      const { user, token } = res.data;
      localStorage.setItem("portfolioUser", JSON.stringify(user));
      localStorage.setItem("portfolioToken", token);

      if (onLogin) onLogin(user);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
