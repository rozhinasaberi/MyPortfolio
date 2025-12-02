// client/src/CustomerDashboard.jsx

import React, { useEffect, useState } from "react";

export default function CustomerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Store selected service requests
  const [requests, setRequests] = useState({});

  useEffect(() => {
    window._serviceRequests = {};
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.log("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (id) => {
    setRequests((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        checked: !prev[id]?.checked,
      },
    }));
  };

  const updateDescription = (id, text) => {
    setRequests((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        desc: text,
      },
    }));
  };

  const sendServiceRequest = async () => {
    const selected = Object.entries(requests)
      .filter(([_, val]) => val.checked)
      .map(([serviceId, val]) => ({
        serviceId,
        description: val.desc || "",
      }));

    if (selected.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const res = await fetch(`http://localhost:3000/api/users/${user._id}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requests: selected }),
    });

    if (res.ok) {
      alert("Service request sent!");
    } else {
      alert("Error sending request.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2>Welcome back, {user.name}</h2>

      {/* TABS */}
      <div className="d-flex gap-3 my-3">
        <button
          className={`btn ${activeTab === "services" ? "btn-dark" : "btn-light"}`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>

        <button
          className={`btn ${activeTab === "messages" ? "btn-dark" : "btn-light"}`}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>

        <button
          className={`btn ${activeTab === "projects" ? "btn-dark" : "btn-light"}`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
      </div>

      {/* SERVICES TAB ------------------------------------------------ */}
      {activeTab === "services" && (
        <div className="mt-4">
          <h3>Your Available Services</h3>

          {loading && <p>Loading...</p>}

          {!loading &&
            services.map((service) => {
              const id = service._id || service.id;

              return (
                <div
                  key={id}
                  style={{
                    marginBottom: "20px",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="checkbox"
                      checked={requests[id]?.checked || false}
                      onChange={() => toggleService(id)}
                    />
                    <h4>{service.title}</h4>
                  </div>

                  <p style={{ opacity: 0.8 }}>{service.shortDescription}</p>

                  {requests[id]?.checked && (
                    <textarea
                      className="form-control"
                      placeholder="Describe what you need..."
                      value={requests[id]?.desc || ""}
                      onChange={(e) => updateDescription(id, e.target.value)}
                      style={{ marginTop: "10px", minHeight: "80px" }}
                    />
                  )}
                </div>
              );
            })}

          <button
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            onClick={sendServiceRequest}
          >
            Send Service Request
          </button>
        </div>
      )}

      {/* MESSAGES TAB ------------------------------------------------ */}
      {activeTab === "messages" && (
        <div>
          <h3>Your Messages</h3>
          <p>Coming soon...</p>
        </div>
      )}

      {/* PROJECTS TAB ------------------------------------------------ */}
      {activeTab === "projects" && (
        <div>
          <h3>Your Requested Projects</h3>
          <p>Coming soon...</p>
        </div>
      )}
    </div>
  );
}
