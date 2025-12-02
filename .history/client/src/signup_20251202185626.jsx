import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    const res = await fetch("https://YOUR-BACKEND.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) return setError(data.error || "Could not create account.");

    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Let's be in touch!</h2>
      <h3 className="auth-sub">Create Account</h3>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
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
        <input
          className="auth-input"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="auth-btn" type="submit">Sign Up</button>
      </form>

      <p className="auth-link">
        Already have an account? <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
}
