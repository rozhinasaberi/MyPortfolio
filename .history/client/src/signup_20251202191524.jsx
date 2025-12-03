// client/src/signup.jsx
import { useState } from "react";

export default function Signup({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const BACKEND = "https://myportfolio-backend.onrender.com";

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${BACKEND}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Signup failed.");
        return;
      }

      setMessage("Signup successful! 🎉");

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (onSuccess) onSuccess(data.user);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error.");
    }
  };

  return (
    <div style={{ padding: "3rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Create Account</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br /><br />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "black",
            color: "white",
            padding: "12px",
            borderRadius: "6px",
          }}
        >
          Sign Up
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem", textAlign: "center" }}>{message}</p>
      )}
    </div>
  );
}
