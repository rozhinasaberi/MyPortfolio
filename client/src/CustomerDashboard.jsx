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

  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);

  const [editingRequestId, setEditingRequestId] = useState(null);
  const [editForm, setEditForm] = useState({ description: "", stage: "Pending" });

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
  // LOAD USER REQUEST HISTORY
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
  // LOAD USER MESSAGES (flattened)
  // -------------------------------
  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${userId}/requests`
      );

      // flatten all messages from all requests
      const allMsgs = [];
      res.data.forEach((req) => {
        (req.messages || []).forEach((m) => {
          allMsgs.push({
            requestTitle: req.serviceId?.title || "Service",
            sender: m.sender,
            text: m.text,
            timestamp: m.timestamp,
          });
        });
      });

      setMessages(allMsgs);
      setShowMessages(true);
    } catch (err) {
      console.error("messages history error:", err);
      alert("Could not load your messages.");
    }
  };

  // -------------------------------
  // CHECKBOX + DESCRIPTION
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
  // SUBMIT NEW SERVICE REQUEST(S)
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
  // ENTER EDIT MODE FOR A REQUEST
  // -------------------------------
  const startEdit = (req) => {
    setEditingRequestId(req._id);
    setEditForm({
      description: req.description || "",
      stage: req.stage || "Pending",
    });
  };

  const cancelEdit = () => {
    setEditingRequestId(null);
    setEditForm({ description: "", stage: "Pending" });
  };

  // -------------------------------
  // SAVE EDITED REQUEST
  // -------------------------------
  const saveEdit = async (requestId) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/${userId}/requests/${requestId}`,
        {
          description: editForm.description,
          stage: editForm.stage,
        }
      );

      const updated = res.data.updated || res.data.updatedRequest;

      setRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, ...updated } : r))
      );

      setEditingRequestId(null);
      alert("Request updated successfully.");
    } catch (err) {
      console.error("UPDATE FAILED:", err);
      alert("Update failed.");
    }
  };

  // -------------------------------
  // RENDER
  // -------------------------------
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
      {/* Header with logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2>Welcome back, {user?.name?.toLowerCase() || "guest"}</h2>

        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              background: "black",
              color: "white",
              border: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Buttons row */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={loadRequests}
          className="btn btn-dark"
          style={{ padding: "8px 14px" }}
        >
          View My Previous Requests
        </button>

        <button
          onClick={loadMessages}
          className="btn btn-primary"
          style={{ padding: "8px 14px" }}
        >
          View My Messages
        </button>
      </div>

      {/* MESSAGES BOX */}
      <div
        style={{
          background: "#eef3ff",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #c8ddff",
          marginBottom: "25px",
        }}
      >
        <h4>Your Messages</h4>

        {!showMessages && (
          <p style={{ marginTop: "8px", color: "#555" }}>
            No messages loaded yet. Click “View My Messages”.
          </p>
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
                <strong>
                  [{m.requestTitle}] – {m.sender === "admin" ? "Admin" : "You"}:
                </strong>{" "}
                {m.text}
              </p>
              <small style={{ color: "#777" }}>
                {new Date(m.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
      </div>

      {/* PREVIOUS REQUESTS (with edit) */}
      {showRequests && (
        <div
          style={{
            marginTop: "10px",
            marginBottom: "25px",
            padding: "20px",
            background: "#fafafa",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Your Previous Requests</h3>

          {requests.length === 0 && <p>You have not submitted any requests yet.</p>}

          {requests.map((req) => {
            const isEditing = editingRequestId === req._id;
            return (
              <div
                key={req._id}
                style={{
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "10px",
                  marginTop: "12px",
                  border: "1px solid #ccc",
                }}
              >
                <h4 style={{ marginBottom: "8px" }}>
                  {req.serviceId?.title || "Requested Service"}
                </h4>

                {/* EDIT MODE */}
                {isEditing ? (
                  <>
                    <div className="mb-2">
                      <label>Description</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            description: e.target.value,
                          }))
                        }
                        style={{
                          width: "100%",
                          minHeight: "70px",
                          marginTop: "5px",
                          padding: "8px",
                        }}
                      />
                    </div>

                    <div className="mb-2">
                      <label>Stage</label>
                      <select
                        value={editForm.stage}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, stage: e.target.value }))
                        }
                        style={{
                          width: "100%",
                          marginTop: "5px",
                          padding: "6px",
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => saveEdit(req._id)}
                        style={{
                          background: "green",
                          color: "white",
                          border: "none",
                          padding: "6px 14px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{
                          background: "#aaa",
                          color: "white",
                          border: "none",
                          padding: "6px 14px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Description:</strong>{" "}
                      {req.description || "No description provided"}
                    </p>

                    <p>
                      <strong>Stage:</strong>{" "}
                      <span
                        style={{
                          color:
                            req.stage === "Completed"
                              ? "green"
                              : req.stage === "In Progress"
                              ? "orange"
                              : "gray",
                          fontWeight: "bold",
                        }}
                      >
                        {req.stage}
                      </span>
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(req.createdAt).toLocaleString()}
                    </p>

                    <button
                      onClick={() => startEdit(req)}
                      style={{
                        marginTop: "5px",
                        background: "#333",
                        color: "#fff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* AVAILABLE SERVICES */}
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
