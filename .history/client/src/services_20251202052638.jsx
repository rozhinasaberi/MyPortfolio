import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await axios.get(`${API_BASE}/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Service load error:", err);
        setError("Failed to load services.");
      }
    };

    loadServices();
  }, []);

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Services</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {services.map((service) => (
        <div
          key={service._id}
          style={{
            padding: "20px",
            marginBottom: "20px",
            background: "#fafafa",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <h3>{service.title}</h3>
          <p style={{ marginTop: "10px", color: "#555" }}>
            {service.shortDescription}
          </p>

          {service.details && (
            <p style={{ marginTop: "10px", color: "#777" }}>
              {service.details}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
