// client/src/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND = "https://myportfolio-1-adrz.onrender.com/api";

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

  // ----------------------------------------------------
  // LOAD SERVICES
  // ----------------------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${BACKEND}/services`);
        setServices(res.data);
      } catch (err) {
        console.error("services error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ----------------------------------------------------
  // LOAD REQUEST HISTORY
  // ----------------------------------------------------
  const loadRequests = async () => {
    try {
      const res = await axios.get(`${BACKEND}/users/${userId}/requests`);
      setRequests(res.data);
      setShowRequests(true);
    } catch (err) {
      console.error("request history error:", err);
      alert("Could not load your previous service requests.");
    }
  };

  // ----------------------------------------------------
  // LOAD MESSAGES
  // ----------------------------------------------------
  const loadMessages = async () => {
    try {
      const res = await axios.get(`${BACKEND}/users/${userId}/requests`);

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
      console.error("messages error:", err);
      alert("Could not load messages.");
    }
  };

  // ----------------------------------------------------
  // CHECKBOX + DESCRIPTION
  // ----------------------------------------------------
  const toggle = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id]?.checked },
    }));
  };

  const updateDesc = (id, text) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { ...prev[id], desc: text },
    }));
  };

  // ----------------------------------------------------
  // SUBMIT SERVICE REQUESTS
  // ----------------------------------------------------
  const submitRequest = async () => {
    const payload = Object.entries(selected)
      .filter(([_, v]) => v.checked)
      .map(([id, v]) => ({
        serviceId: id,
        description: v.desc || "",
      }));

    if (payload.length === 0) return alert("Select a service");

    try {
      await axios.post(`${BACKEND}/users/${userId}/request-services`, payload);
      alert("Request sent!");
      setSelected({});
    } catch (err) {
      console.error("submit error:", err);
      alert("Error sending request.");
    }
  };

  // ----------------------------------------------------
  // EDIT REQUESTS
  // ----------------------------------------------------
  const startEdit = (req) => {
    setEditingRequestId(req._id);
    setEditForm({
      description: req.description,
      stage: req.stage,
    });
  };

  const cancelEdit = () => {
    setEditingRequestId(null);
    setEditForm({ description: "", stage: "Pending" });
  };

  const saveEdit = async (requestId) => {
    try {
      const res = await axios.put(
        `${BACKEND}/users/${userId}/requests/${requestId}`,
        editForm
      );

      const updated = res.data.updated || res.data.updatedRequest;

      setRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, ...updated } : r))
      );

      setEditingRequestId(null);
      alert("Request updated successfully!");
    } catch (err) {
      console.error("update error:", err);
      alert("Could not update request.");
    }
  };

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
      <h2>Welcome back, {user?.name}</h2>

      {onLogout && (
        <button
          onClick={onLogout}
          style={{
            background: "black",
            color: "white",
            border: "none",
            padding: "8px 18px",
            borderRadius: "6px",
          }}
        >
          Logout
        </button>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={loadRequests} className="btn btn-dark">
          View My Previous Requests
        </button>

        <button onClick={loadMessages} className="btn btn-primary">
          View My Messages
        </button>
      </div>

      {/* MESSAGES */}
      {showMessages && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your Messages</h3>
          {messages.length === 0 && <p>No messages yet.</p>}

          {messages.map((m, i) => (
            <div key={i} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              <strong>[{m.requestTitle}] {m.sender}:</strong> {m.text}
              <br />
              <small>{new Date(m.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}

      {/* REQUESTS */}
      {showRequests && (
        <div style={{ marginTop: "30px" }}>
          <h3>Your Previous Requests</h3>

          {requests.length === 0 && <p>No requests yet.</p>}

          {requests.map((req) => (
            <div key={req._id} style={{ padding: "15px", border: "1px solid #ccc", marginTop: "12px" }}>
              <h4>{req.serviceId?.title}</h4>

              {editingRequestId === req._id ? (
                <>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    style={{ width: "100%", minHeight: "70px" }}
                  />

                  <select
                    value={editForm.stage}
                    onChange={(e) => setEditForm({ ...editForm, stage: e.target.value })}
                    style={{ marginTop: "10px", width: "100%" }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button onClick={() => saveEdit(req._id)} className="btn btn-success" style={{ marginTop: "10px" }}>
                    Save
                  </button>
                  <button onClick={cancelEdit} className="btn btn-secondary" style={{ marginTop: "10px", marginLeft: "10px" }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Description:</strong> {req.description}</p>
                  <p><strong>Stage:</strong> {req.stage}</p>
                  <p><strong>Date:</strong> {new Date(req.createdAt).toLocaleString()}</p>

                  <button
                    onClick={() => startEdit(req)}
                    className="btn btn-dark"
                    style={{ marginTop: "10px" }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SERVICES */}
      <h3 style={{ marginTop: "30px" }}>Your Available Services</h3>

      {services.map((s) => {
        const checked = selected[s._id]?.checked || false;
        const desc = selected[s._id]?.desc || "";

        return (
          <div key={s._id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px" }}>
            <input type="checkbox" checked={checked} onChange={() => toggle(s._id)} />
            <strong style={{ marginLeft: "10px" }}>{s.title}</strong>

            {checked && (
              <textarea
                style={{ width: "100%", marginTop: "10px" }}
                value={desc}
                placeholder="Describe your request..."
                onChange={(e) => updateDesc(s._id, e.target.value)}
              />
            )}
          </div>
        );
      })}

      <button
        onClick={submitRequest}
        className="btn btn-dark"
        style={{ marginTop: "20px" }}
      >
        Send Service Request
      </button>
    </div>
  );
}
