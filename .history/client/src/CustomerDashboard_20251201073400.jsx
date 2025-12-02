import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard({ user }) {
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const [showRequests, setShowRequests] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);

  // -------------------------------
  // 1. LOAD SERVICES
  // -------------------------------
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

  // -------------------------------
  // 2. LOAD REQUEST HISTORY
  // -------------------------------
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
      alert("Could not load your previous requests.");
    }
  };

  // -------------------------------
  // 3. LOAD ALL MESSAGES
  // -------------------------------
  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${userId}/requests`
      );

      const allMsgs = [];

      res.data.forEach((req) => {
        if (req.messages && req.messages.length > 0) {
          req.messages.forEach((m) => {
            allMsgs.push({
              serviceTitle: req.serviceId?.title || "Service",
              text: m.text,
              sender: m.sender,
              timestamp: m.timestamp,
            });
          });
        }
      });

      setMessages(allMsgs);
      setShowMessages(true);
      setShowRequests(false);
    } catch (err) {
      console.error("message history error:", err);
      alert("Could not load your messages.");
    }
  };

  // -------------------------------
  // 4. CHECKBOX HANDLER
  // -------------------------------
  const toggle = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id]?.checked },
    }));
  };

  // -------------------------------
  // 5. DESCRIPTION HANDLER
  // -------------------------------
  const updateDesc = (id, text) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { ...prev[id], desc: text },
    }));
  };

  // -------------------------------
  // 6. SUBMIT REQUEST
  // -------------------------------
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
      setShowRequests(false);
      setShowMessages(false);
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

      {/* ------------ BUTTONS ------------- */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={loadRequests}
          style={{
            background: "#333",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
          }}
        >
          View My Previous Requests
        </button>

        <button
          onClick={loadMessages}
          style={{
            background: "#0074D9",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
          }}
        >
          View My Messages
        </button>
      </div>

      {/* ------------------------------------
          REQUEST HISTORY PANEL
      ------------------------------------- */}
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
          <h3>Your Previous Requests</h3>

          {requests.length === 0 && <p>No previous requests.</p>}

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
              <h4>{r.serviceId?.title || "Requested Service"}</h4>

              <p>
                <strong>Description:</strong> {r.description || "None"}
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

      {/* ------------------------------------
          MESSAGES PANEL
      ------------------------------------- */}
      {showMessages && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#eef7ff",
            borderRadius: "10px",
            border: "1px solid #bcdcff",
          }}
        >
          <h3>Messages</h3>

          {messages.length === 0 && <p>No reply yet.</p>}

          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                padding: "12px",
                borderRadius: "8px",
                marginTop: "10px",
                border: "1px solid #ddd",
              }}
            >
              <p style={{ marginBottom: "4px" }}>
                <strong>{m.serviceTitle}</strong>
              </p>

              <p>
                <strong>{m.sender === "admin" ? "Admin" : "You"}:</strong>{" "}
                {m.text}
              </p>

              <small style={{ color: "#666" }}>
                {new Date(m.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}

      {/* ------------------------------------
          AVAILABLE SERVICES
      ------------------------------------- */}
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

      {/* SUBMIT */}
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
