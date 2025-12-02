import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    const res = await fetch("https://YOUR-BACKEND.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) return setError(data.error || "Invalid credentials");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back</h2>
      <h3 className="auth-sub">Sign In</h3>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="auth-btn" type="submit">Login</button>
      </form>

      <p className="auth-link">
        Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
      </p>
    </div>
  );
}
