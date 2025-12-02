import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard({ user }) {
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);

  // -------------------------------
  // 1. LOAD SERVICES
  // -------------------------------
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

  // -------------------------------
  // 2. LOAD USER REQUESTS HISTORY
  // -------------------------------
  const loadRequests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${userId}/requests`
      );
      setRequests(res.data);
      setShowRequests(true);
    } catch (err) {
      console.error("request history error:", err);
      alert("Could not load your previous service requests.");
    }
  };

  // -------------------------------
  // 3. HANDLE CHECKBOX
  // -------------------------------
  const toggle = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        checked: !prev[id]?.checked,
      },
    }));
  };

  // -------------------------------
  // 4. HANDLE DESCRIPTION
  // -------------------------------
  const updateDesc = (id, text) => {
    setSelected((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        desc: text,
      },
    }));
  };

  // -------------------------------
  // 5. SUBMIT SERVICE REQUEST
  // -------------------------------
  const submitRequest = async () => {
    const payload = Object.entries(selected)
      .filter(([_, value]) => value.checked)
      .map(([id, value]) => ({
        serviceId: id,
        description: value.desc || "",
      }));

    if (payload.length === 0) {
      alert("Select a service first");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/users/${userId}/request-services`,
        payload
      );

      alert("Request sent!");
      setSelected({});
      setShowRequests(false);
    } catch (err) {
      console.error(err);
      alert("Error sending request");
    }
  };

  // -------------------------------
  // RENDER
  // -------------------------------
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
      <h2>Welcome back, {user?.name}</h2>

      {/* VIEW REQUEST HISTORY */}
      <button
        onClick={loadRequests}
        style={{
          background: "#333",
          color: "white",
          padding: "10px 15px",
          borderRadius: "6px",
          marginTop: "15px",
        }}
      >
        View My Previous Requests
      </button>

      {/* --------------------------------
           REQUEST HISTORY PANEL
      -------------------------------- */}
      {showRequests && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#f5f5f5",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Your Previous Requests</h3>

          {requests.length === 0 && <p>No previous requests yet.</p>}

          {requests.map((req, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                border: "1px solid #ccc",
              }}
            >
              <h4>{req.serviceId?.title || "Requested Service"}</h4>

              <p>
                <strong>Description: </strong>
                {req.description || "No description provided"}
              </p>

              <p>
                <strong>Stage: </strong>
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      req.stage === "Completed"
                        ? "green"
                        : req.stage === "In Progress"
                        ? "orange"
                        : "gray",
                  }}
                >
                  {req.stage}
                </span>
              </p>

              <p>
                <strong>Date: </strong>
                {new Date(req.createdAt).toLocaleString()}
              </p>

              <div style={{ marginTop: "10px" }}>
                <strong>Messages:</strong>

                {(!req.messages || req.messages.length === 0) && (
                  <p>No messages yet.</p>
                )}

                {req.messages?.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      marginTop: "8px",
                      padding: "10px",
                      background: "#fafafa",
                      borderRadius: "6px",
                      border: "1px solid #eee",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      <strong>{m.sender === "admin" ? "Admin" : "You"}:</strong>{" "}
                      {m.text}
                    </p>
                    <small style={{ color: "#666" }}>
                      {new Date(m.timestamp).toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --------------------------------
           AVAILABLE SERVICES
      -------------------------------- */}
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
              marginBottom: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(s._id)}
              />
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
                  padding: "8px",
                }}
              />
            )}
          </div>
        );
      })}

      {/* SUBMIT REQUEST */}
      <button
        onClick={submitRequest}
        style={{
          background: "black",
          color: "white",
          padding: "12px 20px",
          borderRadius: "6px",
          marginTop: "15px",
        }}
      >
        Send Service Request
      </button>
    </div>
  );
}
