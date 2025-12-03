// client/src/signup.jsx
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
      console.log("SIGNUP RESPONSE:", data);

      if (!res.ok) {
        setMessage(data.error || "Signup failed.");
        return;
      }

      setMessage("Signup successful! 🎉");

      // Save new user
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token || "");
        if (onSuccess) onSuccess(data.user);
      }
    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      setMessage("Server error. Try again.");
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
          style={inputStyle}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          style={inputStyle}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit" style={btnStyle}>
          Sign Up
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem", textAlign: "center" }}>{message}</p>
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
