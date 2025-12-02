import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

export default function CustomerDashboard({ user, setUser }) {
  const userId = user?._id;

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);

  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);

  const [editing, setEditing] = useState(null);
  const [editDesc, setEditDesc] = useState("");
  const [editStage, setEditStage] = useState("Pending");

  // LOAD SERVICES
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/services`);
        setServices(res.data);
      } catch (err) {
        console.error("services error:", err);
      }
      setLoading(false);
    };
    load();
  }, []);

  // LOAD REQUEST HISTORY
  const loadRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users/${userId}/requests`);
      setRequests(res.data);
      setShowRequests(true);
    } catch (err) {
      alert("Could not load previous requests.");
    }
  };

  // LOAD ALL MESSAGES
  const loadMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users/${userId}/messages`);
      setMessages(res.data);
      setShowMessages(true);
    } catch (err) {
      alert("Could not load messages.");
    }
  };

  // SUBMIT SERVICE REQUEST
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
      await axios.post(`${API_BASE}/users/${userId}/request-services`, payload);
      alert("Request sent!");
      setSelected({});
      setShowRequests(false);
    } catch (err) {
      alert("Error sending request");
    }
  };

  // SAVE REQUEST UPDATE
  const saveUpdate = async (reqId) => {
    try {
      const res = await axios.put(
        `${API_BASE}/users/${userId}/requests/${reqId}`,
        {
          description: editDesc,
          stage: editStage,
        }
      );

      alert("Updated!");
      setEditing(null);
      loadRequests();
    } catch (err) {
      alert("Update failed.");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Welcome back, {user?.name}</h2>
        <button onClick={logout} style={{ padding: "8px 15px" }}>Logout</button>
      </div>

      <button onClick={loadRequests}>View My Previous Requests</button>
      <button onClick={loadMessages} style={{ marginLeft: "10px" }}>
        View My Messages
      </button>

      {showMessages && (
        <div style={{ marginTop: "20px", padding: "20px", background: "#eef" }}>
          <h3>Your Messages</h3>
          {messages.length === 0 && <p>No messages yet.</p>}
          {messages.map((m, i) => (
            <div key={i} style={{ padding: "10px", background: "#fff", marginTop: "10px" }}>
              <strong>{m.sender}:</strong> {m.text}
              <br />
              <small>{new Date(m.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}

      {showRequests && (
        <div style={{ marginTop: "20px", padding: "20px", background: "#f6f6f6" }}>
          <h3>Your Previous Requests</h3>

          {requests.map((req) => (
            <div key={req._id} style={{ padding: "15px", background: "white", marginTop: "10px" }}>
              <h4>{req.serviceId?.title}</h4>

              {editing === req._id ? (
                <>
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    style={{ width: "100%", padding: "10px" }}
                  ></textarea>

                  <select
                    value={editStage}
                    onChange={(e) => setEditStage(e.target.value)}
                    style={{ marginTop: "10px", padding: "8px" }}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>

                  <button onClick={() => saveUpdate(req._id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p><strong>Description:</strong> {req.description || "No description provided"}</p>
                  <p><strong>Stage:</strong> {req.stage}</p>
                  <button
                    onClick={() => {
                      setEditing(req._id);
                      setEditDesc(req.description);
                      setEditStage(req.stage);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <h3>Your Available Services</h3>
      {services.map((s) => {
        const checked = selected[s._id]?.checked || false;
        const desc = selected[s._id]?.desc || "";

        return (
          <div key={s._id} style={{ padding: "15px", background: "white", marginTop: "10px" }}>
            <input type="checkbox" checked={checked}
              onChange={() =>
                setSelected((prev) => ({
                  ...prev,
                  [s._id]: { ...prev[s._id], checked: !checked },
                }))
              }
            />
            <strong>{s.title}</strong>
            <p>{s.shortDescription}</p>

            {checked && (
              <textarea
                value={desc}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev,
                    [s._id]: { ...prev[s._id], desc: e.target.value },
                  }))
                }
                style={{ width: "100%", minHeight: "60px" }}
              ></textarea>
            )}
          </div>
        );
      })}

      <button onClick={submitRequest} style={{ marginTop: "20px" }}>
        Send Service Request
      </button>
    </div>
  );
}
