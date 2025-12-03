import { useState } from "react";

export default function Signup({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const BACKEND = "https://myportfolio-1-adrz.onrender.com/api";

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

      setMessage("Signup successful!");

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
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />

        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />

        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" />

        <button type="submit">Sign Up</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
