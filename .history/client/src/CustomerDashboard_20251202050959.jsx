// client/src/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./api";

export default function CustomerDashboard({ user, onLogout }) {
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);
  const [editingRequestId, setEditingRequestId] = useState(null);
  const [editForm, setEditForm] = useState({ description: "", stage: "Pending" });

  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  // -------------------------------
  // 1. LOAD SERVICES
  // -------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/services`);
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
  // 2. LOAD USER REQUEST HISTORY
  // -------------------------------
  const loadRequests = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/users/${userId}/requests`
      );
      setRequests(res.data);
      setShowRequests(true);
    } catch (err) {
      console.error("request history error:", err);
      alert("Could not load your previous service requests.");
    }
  };

  // -------------------------------
  // 3. LOAD USER MESSAGES
  // (show all messages from all requests)
  // -------------------------------
  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/users/${userId}/messages`
      );
      setMessages(res.data || []);
      setShowMessages(true);
    } catch (err) {
      console.error("messages error:", err);
      alert("Could not load your messages.");
    }
  };

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
        `${API_BASE}/api/users/${userId}/request-services`,
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
  // EDIT REQUEST HELPERS
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

  const saveEdit = async (requestId) => {
    try {
      await axios.put(
        `${API_BASE}/api/users/${userId}/requests/${requestId}`,
        {
          description: editForm.description,
          stage: editForm.stage,
        }
      );

      const updated = requests.map((r) =>
        r._id === requestId
          ? { ...r, description: editForm.description, stage: editForm.stage }
          : r
      );
      setRequests(updated);
      cancelEdit();
      alert("Request updated!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Welcome back, {user?.name?.toLowerCase()}</h2>

        <button
          onClick={onLogout}
          style={{
            background: "#000",
            color: "#fff",
            borderRadius: "6px",
            padding: "8px 14px",
          }}
        >
          Logout
        </button>
      </div>

      {/* Top buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={loadRequests} className="btn btn-dark">
          View My Previous Requests
        </button>
        <button onClick={loadMessages} className="btn btn-primary">
          View My Messages
        </button>
      </div>

      {/* MESSAGES BOX */}
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

        {!showMessages && <p>No reply yet.</p>}

        {showMessages && messages.length === 0 && <p>No messages yet.</p>}

        {showMessages &&
          messages.length > 0 &&
          messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                marginTop: "8px",
                padding: "10px 12px",
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #d6e4ff",
              }}
            >
              <p style={{ marginBottom: 4 }}>
                <strong>{m.fromAdmin ? "Admin" : "You"}:</strong> {m.text}
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
            background: "#f4f4f4",
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

                {!isEditing && (
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
                        marginTop: "8px",
                        padding: "6px 12px",
                        borderRadius: "6px",
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}

                {isEditing && (
                  <>
                    <label style={{ display: "block", marginTop: "8px" }}>
                      Description
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
                          marginTop: "6px",
                          padding: "8px",
                        }}
                      />
                    </label>

                    <label style={{ display: "block", marginTop: "8px" }}>
                      Stage
                      <select
                        value={editForm.stage}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, stage: e.target.value }))
                        }
                        style={{
                          width: "100%",
                          marginTop: "6px",
                          padding: "6px 8px",
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </label>

                    <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => saveEdit(req._id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          background: "green",
                          color: "#fff",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          background: "#ccc",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* AVAILABLE SERVICES */}
      <h3 style={{ marginTop: "20px" }}>Your Available Services</h3>

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
          marginTop: "5px",
        }}
      >
        Send Service Request
      </button>
    </div>
  );
}
