// client/src/Contact.jsx
import React, { useState } from "react";

const BACKEND = "https://myportfolio-1-adrz.onrender.com/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch(`${BACKEND}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Error sending message.");
        return;
      }

      setStatus("Message sent successfully! 🎉");

      // reset fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Server error, please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>Send Me a Message</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "12px", padding: "10px" }}
        />

        <input
          type="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "12px", padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Subject (optional)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ width: "100%", marginBottom: "12px", padding: "10px" }}
        />

        <textarea
          placeholder="Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            minHeight: "120px",
            marginBottom: "12px",
            padding: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            background: "black",
            color: "white",
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
          }}
        >
          Send
        </button>
      </form>

      {status && (
        <p style={{ marginTop: "15px", textAlign: "center", color: "green" }}>
          {status}
        </p>
      )}
    </div>
  );
}
