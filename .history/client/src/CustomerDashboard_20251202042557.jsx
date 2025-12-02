import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard({ user }) {
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);

  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);

  // EDITING STATES
  const [editing, setEditing] = useState(null);
  const [editDesc, setEditDesc] = useState("");
  const [editStage, setEditStage] = useState("Pending");

  // -------------------------------
  // LOAD SERVICES
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
  // LOAD REQUEST HISTORY
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
      alert("Could not load your previous service requests.");
    }
  };

  // -------------------------------
  // LOAD USER MESSAGES ONLY
  // -------------------------------
  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${userId}/requests`
      );

      // Collect ALL messages from all requests
      const msgs = [];
      res.data.forEach((req) => {
        if (req.messages && req.messages.length > 0) {
          req.messages.forEach((m) => msgs.push(m));
        }
      });

      setMessages(msgs);
      setShowMessages(true);
      setShowRequests(false);
    } catch (err) {
      console.error("msg error:", err);
      alert("Could not load your messages.");
    }
  };

  // -------------------------------
  // HANDLE CHECKBOX
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
  // HANDLE DESCRIPTION
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
  // SUBMIT REQUEST
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

      {/* TOP BUTTONS */}
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button
          onClick={loadRequests}
          className="btn btn-dark"
        >
          View My Previous Requests
        </button>

        <button
          onClick={loadMessages}
          className="btn btn-primary"
        >
          View My Messages
        </button>
      </div>
      

      {/* ===============================
          MESSAGES LIST
      =============================== */}
      {showMessages && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#eef3ff",
            borderRadius: "10px",
            border: "1px solid #c8ddff",
          }}
        >
          <h4>Your Messages</h4>

          {messages.length === 0 && (
            <p style={{ marginTop: "8px", color: "#555" }}>No reply yet.</p>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #d6e4ff",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>{m.sender === "admin" ? "Admin" : "You"}: </strong>
                {m.text}
              </p>
              <small style={{ color: "#777" }}>
                {new Date(m.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}

      {/* ===============================
          PREVIOUS REQUESTS WITH EDIT
      =============================== */}
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

          {requests.length === 0 && <p>No requests yet.</p>}

          {requests.map((r) => (
            <div
              key={r._id}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "12px",
                border: "1px solid #ccc",
              }}
            >
              <h4>{r.serviceId?.title || "Requested Service"}</h4>

              {/* NORMAL VIEW */}
              {editing !== r._id && (
                <>
                  <p><strong>Description:</strong> {r.description || "No description provided"}</p>
                  <p><strong>Stage:</strong> {r.stage}</p>
                  <p><strong>Date:</strong> {new Date(r.createdAt).toLocaleString()}</p>

                  <button
                    onClick={() => {
                      setEditing(r._id);
                      setEditDesc(r.description);
                      setEditStage(r.stage);
                    }}
                    style={{
                      marginTop: "10px",
                      padding: "6px 12px",
                      background: "#1976d2",
                      color: "white",
                      borderRadius: "6px",
                      border: "none",
                    }}
                  >
                    Edit
                  </button>
                </>
              )}

              {/* EDIT MODE */}
              {editing === r._id && (
                <div style={{ marginTop: "10px" }}>
                  <label>Description</label>
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: "70px",
                      marginBottom: "10px",
                      padding: "8px",
                    }}
                  />

                  <label>Stage</label>
                  <select
                    value={editStage}
                    onChange={(e) => setEditStage(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={async () => {
                        try {
                          await axios.put(
                            `http://localhost:3000/api/users/${userId}/requests/${r._id}`,
                            { description: editDesc, stage: editStage }
                          );
                          alert("Request updated!");
                          setEditing(null);
                          loadRequests();
                        } catch (err) {
                          console.error(err);
                          alert("Update failed.");
                        }
                      }}
                      style={{
                        padding: "6px 12px",
                        background: "green",
                        color: "white",
                        borderRadius: "6px",
                        border: "none",
                      }}
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditing(null)}
                      style={{
                        padding: "6px 12px",
                        background: "gray",
                        color: "white",
                        borderRadius: "6px",
                        border: "none",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===============================
          AVAILABLE SERVICES
      =============================== */}
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

      {/* SUBMIT BUTTON */}
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
