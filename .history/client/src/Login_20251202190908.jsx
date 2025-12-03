import React, { useState } from "react";

export default function Login({ onSuccess, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch(
        "https://myportfolio-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role || "user");

      if (setRole) setRole(data.user.role || "user");
      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      setErrorMsg("Network error. Try again.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Sign In</h2>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-visitpage" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
