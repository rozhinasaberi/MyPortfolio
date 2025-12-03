// client/src/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./api";

export default function CustomerDashboard({ user, onLogout }) {
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({});
  const [loadingServices, setLoadingServices] = useState(true);

  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);
  const [editingRequestId, setEditingRequestId] = useState(null);
  const [editForm, setEditForm] = useState({ description: "", stage: "Pending" });

  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);

  // LOAD SERVICES
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("services error:", err);
      } finally {
        setLoadingServices(false);
      }
    };
    load();
  }, []);

  // LOAD REQUEST HISTORY
  const loadRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${userId}/requests`);
      setRequests(res.data);
      setShowRequests(true);
    } catch (err) {
      console.error("request history error:", err);
      alert("Could not load your previous service requests.");
    }
  };

  // LOAD MESSAGES (from requests)
  const loadMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${userId}/requests`);
      const allMessages = [];

      res.data.forEach((req) => {
        (req.messages || []).forEach((m) => {
          if (m.text) {
            allMessages.push({
              requestTitle: req.serviceId?.title || "Service",
              ...m,
            });
          }
        });
      });

      setMessages(allMessages);
      setShowMessages(true);
      setShowRequests(false);
    } catch (err) {
      console.error("messages load error:", err);
      alert("Could not load your messages.");
    }
  };

  // CHECKBOX TOGGLE
  const toggle = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id]?.checked },
    }));
  };

  // DESCRIPTION FOR SELECTED SERVICE
  const updateDesc = (id, text) => {
    setSelected((prev) => ({
      ...prev,
      [id]: { ...prev[id], desc: text },
    }));
  };

  // SUBMIT NEW SERVICE REQUEST
  const submitRequest = async () => {
    const payload = Object.entries(selected)
      .filter(([_, v]) => v.checked)
      .map(([serviceId, v]) => ({
        serviceId,
        description: v.desc || "",
      }));

    if (!payload.length) {
      alert("Select at least one service.");
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
      setShowMessages(false);
      await loadRequests(); // refresh panel
    } catch (err) {
      console.error("submit error:", err);
      alert("Error sending request.");
    }
  };

  // START EDITING A REQUEST
  const startEdit = (req) => {
    setEditingRequestId(req._id);
    setEditForm({
      description: req.description || "",
      stage: req.stage || "Pending",
    });
  };

  const cancelEdit = () => {
    setEditingRequestId(null);
  };

  // SAVE EDITED REQUEST
  const saveEdit = async () => {
    try {
      await axios.put(
        `${API_BASE}/api/users/${userId}/requests/${editingRequestId}`,
        {
          description: editForm.description,
          stage: editForm.stage,
        }
      );

      alert("Request updated.");
      setEditingRequestId(null);
      await loadRequests();
    } catch (err) {
      console.error("update error:", err);
      alert("Update failed.");
    }
  };

  if (!userId) return <p>Missing user.</p>;
  if (loadingServices) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome back, {user?.name?.toLowerCase?.() || user?.name}</h2>
        <button onClick={onLogout} className="btn btn-small">
          Logout
        </button>
      </div>

      {/* TOP BUTTONS */}
      <div className="dashboard-actions">
        <button className="btn" onClick={loadRequests}>
          View My Previous Requests
        </button>
        <button className="btn btn-secondary" onClick={loadMessages}>
          View My Messages
        </button>
      </div>

      {/* MESSAGES BOX */}
      {showMessages && (
        <section className="dashboard-panel">
          <h4>Your Messages</h4>
          {messages.length === 0 ? (
            <p>No reply yet.</p>
          ) : (
            messages.map((m, idx) => (
              <div key={idx} className="message-card">
                <p>
                  <strong>{m.sender === "admin" ? "Admin" : "You"}</strong>{" "}
                  on <em>{m.requestTitle}</em>
                </p>
                <p>{m.text}</p>
                <small>
                  {new Date(m.timestamp).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </section>
      )}

      {/* PREVIOUS REQUESTS (with edit) */}
      {showRequests && (
        <section className="dashboard-panel">
          <h4>Your Previous Requests</h4>

          {requests.length === 0 && <p>You have not submitted any requests yet.</p>}

          {requests.map((req) => {
            const isEditing = editingRequestId === req._id;

            return (
              <div key={req._id} className="request-card">
                <h5>{req.serviceId?.title || "Requested Service"}</h5>

                {!isEditing && (
                  <>
                    <p>
                      <strong>Description:</strong>{" "}
                      {req.description || "No description provided"}
                    </p>

                    <p>
                      <strong>Stage:</strong> {req.stage}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(req.createdAt).toLocaleString()}
                    </p>

                    <button
                      className="btn btn-small"
                      onClick={() => startEdit(req)}
                    >
                      Edit
                    </button>
                  </>
                )}

                {isEditing && (
                  <>
                    <label className="edit-label">
                      Description
                      <textarea
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </label>

                    <label className="edit-label">
                      Stage
                      <select
                        value={editForm.stage}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            stage: e.target.value,
                          }))
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </label>

                    <div className="edit-buttons">
                      <button className="btn btn-small" onClick={saveEdit}>
                        Save
                      </button>
                      <button
                        className="btn btn-small btn-secondary"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* AVAILABLE SERVICES SECTION */}
      <section className="dashboard-panel">
        <h4>Your Available Services</h4>

        {services.map((s) => {
          const checked = selected[s._id]?.checked || false;
          const desc = selected[s._id]?.desc || "";

          return (
            <div key={s._id} className="request-service-card">
              <div className="request-service-header">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(s._id)}
                />
                <h5>{s.title}</h5>
              </div>
              <p>{s.description}</p>

              {checked && (
                <textarea
                  placeholder="Describe what you need..."
                  value={desc}
                  onChange={(e) => updateDesc(s._id, e.target.value)}
                />
              )}
            </div>
          );
        })}

        <button className="btn" onClick={submitRequest}>
          Send Service Request
        </button>
      </section>
    </div>
  );
}
