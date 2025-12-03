import { useState } from "react";

export default function Signup({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch(
        "https://myportfolio-2.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Signup failed");
        return;
      }

      setStatus("Account created! Please log in.");
      onSuccess && onSuccess();
    } catch (err) {
      console.error("Signup error:", err);
      setStatus("Server error");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          name="phone"
          type="text"
          value={form.phone}
          onChange={handleChange}
        />

        <button type="submit">Create Account</button>
      </form>

      {status && <p style={{ color: "red" }}>{status}</p>}
    </div>
  );
}
