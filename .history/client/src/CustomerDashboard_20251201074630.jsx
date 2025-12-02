// client/src/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard({ user, onLogout }) {
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);

  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  // 1. LOAD SERVICES
  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("services error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  // 2. LOAD REQUEST HISTORY
  const loadRequests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${userId}/requests`
      );
      setRequests(res.data);
      setShowRequests(true);
      setShowMessages(false);
    } catch (err) {
      console.error("request history error:", err);
      alert("Could not load your previous service requests.");
    }
  };

  // 3. LOAD MESSAGES
  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${userId}/messages`
      );
      setMessages(res.data);
      setShowMessages(true);
      setShowRequests(false);
    } catch (err) {
      console.error("messages error:", err);
      alert("Could not load your messages.");
    }
  };

  // 4. CHECKBOX
  const toggle = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        checked: !prev[id]?.checked,
      },
    }));
  };

  // 5. DESCRIPTION
  const updateDesc = (id, text) => {
    setSelected((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        desc: text,
      },
    }));
  };

  // 6. SUBMIT REQUEST
  const submitRequest = async () => {
    const payload = Object.entries(selected)
      .filter(([_, v]) => v.checked)
      .map(([id, v]) => ({
        serviceId: id,
        description: v.desc || "",
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
      await loadMessages(); // refresh messages box
    } catch (err) {
      console.error(err);
      alert("Error sending request");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
      {/* HEADER WITH LOGOUT BUTTON */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Welcome back, {user?.name}</h2>

        {onLogout && (
          <button
            onClick={onLogout}
            className="btn btn-outline-dark btn-sm"
          >
            Logout
          </button>
        )}
      </div>

      {/* TOP BUTTONS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button onClick={loadRequests} className="btn btn-dark">
          View My Previous Requests
        </button>

        <button onClick={loadMessages} className="btn btn-primary">
          View My Messages
        </button>
      </div>

      {/* YOUR MESSAGES BOX */}
      <div
        style={{
          marginBottom: "25px",
          padding: "20px",
          background: "#e9f3ff",
          borderRadius: "10px",
          border: "1px solid #c8ddff",
        }}
      >
        <h4>Your Messages</h4>

        {!showMessages && messages.length === 0 && (
          <p style={{ marginTop: "8px", color: "#555" }}>No reply yet.</p>
        )}

        {showMessages && messages.length === 0 && (
          <p style={{ marginTop: "8px", color: "#555" }}>No reply yet.</p>
        )}

        {showMessages &&
          messages.length > 0 &&
          messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                marginTop: "10px",
                padding: "10px 12px",
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #d6e4ff",
              }}
            >
              <p style={{ marginBottom: 4 }}>
                <strong>{m.sender === "admin" ? "Admin" : "You"}:</strong>{" "}
                {m.text}
              </p>
              <small style={{ display: "block", color: "#777" }}>
                {m.serviceTitle && (
                  <>
                    <em>{m.serviceTitle}</em> ·{" "}
                  </>
                )}
                {new Date(m.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
      </div>

      {/* REQUEST HISTORY PANEL */}
      {showRequests && (
        <div
          style={{
            marginBottom: "25px",
            padding: "20px",
            background: "#f5f5f5",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Your Previous Requests</h3>

          {requests.length === 0 && (
            <p>You have not submitted any requests yet.</p>
          )}

          {requests.map((r, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "12px",
                border: "1px solid #ccc",
              }}
            >
              <h4 style={{ marginBottom: "8px" }}>
                {r.serviceId?.title || "Requested Service"}
              </h4>

              <p>
                <strong>Description:</strong>{" "}
                {r.description || "No description provided"}
              </p>

              <p>
                <strong>Stage:</strong>{" "}
                <span
                  style={{
                    color:
                      r.stage === "Completed"
                        ? "green"
                        : r.stage === "In Progress"
                        ? "orange"
                        : "gray",
                    fontWeight: "bold",
                  }}
                >
                  {r.stage}
                </span>
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* SERVICES */}
      <h3 style={{ marginTop: "10px" }}>Your Available Services</h3>

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
