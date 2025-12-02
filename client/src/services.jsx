// client/src/Services.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Services load error:", err.response?.data || err);
        setError("Failed to load services.");
      }
    };
    load();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!services.length) {
    return <p>Loading services...</p>;
  }

  return (
    <div className="cards-grid">
      {services.map((s) => (
        <article key={s._id} className="card">
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          {s.price && (
            <p className="muted">
              <strong>Starts at:</strong> {s.price}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
