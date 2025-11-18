import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if(res.ok) {
        setMessage("Signup successful!");
        console.log("User:", data);
        // OPTIONAL: store token
        localStorage.setItem("token", data.token);
      } else {
        setMessage(data.error || "Signup failed");
      }

    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Create Account</button>
      </form>

      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
}
