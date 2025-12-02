// client/src/CustomerDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard({ user }) {
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [showRequests, setShowRequests] = useState(false);
const [requests, setRequests] = useState([]);

const loadRequests = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/users/${userId}/requests`);
    setRequests(res.data);
    setShowRequests(true);
  } catch (err) {
    console.error("request load error:", err);
  }
};

  // Fetch available services
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("services error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggle = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id]?.checked }
    }));
  };

  const updateDesc = (id, text) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { ...prev[id], desc: text }
    }));
  };

  const submitRequest = async () => {
    const payload = Object.entries(selected)
      .filter(([_, v]) => v.checked)
      .map(([id, v]) => ({
        serviceId: id,
        description: v.desc || "",
      }));
  
    if (payload.length === 0) {
      alert("Select something first");
      return;
    }
  
    try {
      await axios.post(`http://localhost:3000/api/users/${userId}/request-services`, payload);
      alert("Request sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending request");
    }
  };
  
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
      <h2>Welcome back, {user?.name}</h2>

      <button
  onClick={loadRequests}
  style={{
    background: "#444",
    color: "white",
    padding: "10px 18px",
    borderRadius: "6px",
    marginBottom: "20px"
  }}
>
  View My Requests
</button>

      <h3 style={{ marginTop: "40px" }}>Your Available Services</h3>

      {services.map((s) => {
        const checked = selected[s._id]?.checked || false;
        const desc = selected[s._id]?.desc || "";

        return (
          <div
            key={s._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px"
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input type="checkbox" checked={checked} onChange={() => toggle(s._id)} />
              <h4>{s.title}</h4>
            </div>

            <p>{s.shortDescription}</p>

            {checked && (
              <textarea
                placeholder="Describe what you need..."
                value={desc}
                onChange={(e) => updateDesc(s._id, e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "70px",
                  marginTop: "10px",
                  padding: "8px"
                }}
              />
            )}
          </div>
        );
      })}

      <button
        onClick={submitRequest}
        style={{
          background: "black",
          color: "white",
          padding: "12px 20px",
          borderRadius: "6px",
          marginTop: "15px"
        }}
      >
        Send Service Request
      </button>
    </div>
  );
}
