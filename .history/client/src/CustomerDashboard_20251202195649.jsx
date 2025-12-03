import React, { useState, useEffect } from "react";
import { BACKEND } from "./config";

export default function CustomerDashboard({ user }) {
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);

  // 1. Load available services
  useEffect(() => {
    fetch(`${BACKEND}/api/services`)
      .then((res) => res.json())
      .then(setServices)
      .catch((err) => console.error("services error:", err));
  }, []);

  // 2. Load previous service requests
  const loadRequests = () => {
    fetch(`${BACKEND}/api/users/${user._id}/requests`)
      .then((res) => res.json())
      .then(setRequests)
      .catch((err) => console.error("requests load error:", err));
  };

  // 3. Load messages
  const loadMessages = () => {
    fetch(`${BACKEND}/api/users/${user._id}/messages`)
      .then((res) => res.json())
      .then(setMessages)
      .catch((err) => console.error("messages load error:", err));
  };

  // 4. Send service request
  const sendRequest = async (serviceId, description) => {
    try {
      const res = await fetch(`${BACKEND}/api/users/${user._id}/request-services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error sending request.");
        return;
      }

      alert("Request submitted!");
      loadRequests();
    } catch (err) {
      console.error(err);
      alert("Server error sending request.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome back, {user.name}</h2>

      <button onClick={loadRequests}>View My Previous Requests</button>
      <button onClick={loadMessages}>View My Messages</button>

      <h3>Your Available Services</h3>

      {services.map((s) => (
        <div key={s._id}>
          <p>{s.name}</p>
          <button onClick={() => sendRequest(s._id, "Need help with this service")}>
            Send Request
          </button>
        </div>
      ))}
    </div>
  );
}
