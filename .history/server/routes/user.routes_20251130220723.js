// client/src/CustomerDashboard.jsx

import React, { useState, useEffect } from "react";

export default function CustomerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);

  // Needed for checkboxes
  if (!window._serviceRequests) window._serviceRequests = {};

  // Fetch services
  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log("Service fetch error:", err));
  }, []);

  // Fetch messages for customer (optional)
  useEffect(() => {
    fetch(`http://localhost:3000/api/contacts/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => {});
  }, [user._id]);

  // Fetch purchased projects (for now empty)
  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${user._id}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {});
  }, [user._id]);

  // Submit selected service requests
  const handleSubmitSelectedServices = async () => {
    const selected = Object.entries(window._serviceRequests).filter(
      ([_, data]) => data.checked
    );

    if (selected.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    for (const [serviceId, data] of selected) {
      await fetch(
        `http://localhost:3000/api/user/${user._id}/request-service`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId,
            description: data.desc,
          }),
        }
      );
    }

    alert("Service request(s) sent!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Welcome back, {user.name}</h2>

      {/* TABS */}
      <div style={{ marginTop: "30px", marginBottom: "25px" }}>
        <button
          className={`btn ${activeTab === "services" ? "btn-dark" : "btn-light"}`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>

        <button
          className={`btn ms-2 ${
            activeTab === "messages" ? "btn-dark" : "btn-light"
          }`}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>

        <button
          className={`btn ms-2 ${
            activeTab === "projects" ? "btn-dark" : "btn-light"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
      </div>

      {/* SERVICES TAB */}
      {activeTab === "services" && (
        <div>
          <h3>Your Available Services</h3>
          <br />

          {services.map((service) => (
            <ServiceRequestItem key={service._id} service={service} />
          ))}

          <button
            onClick={handleSubmitSelectedServices}
            className="btn btn-dark mt-4"
          >
            Send Service Request
          </button>
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === "messages" && (
        <div>
          <h3>Your Messages</h3>
          {messages.length === 0 && <p>No messages yet.</p>}
          {messages.map((msg) => (
            <div key={msg._id} className="box mt-2">
              <h5>{msg.subject}</h5>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === "projects" && (
        <div>
          <h3>Your Purchased Projects</h3>
          {projects.length === 0 && <p>You have no projects yet.</p>}
          {projects.map((project) => (
            <div key={project._id} className="box mt-2">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* -----------------------------
   SERVICE REQUEST LINE COMPONENT
--------------------------------*/
function ServiceRequestItem({ service }) {
  const [checked, setChecked] = useState(false);
  const [desc, setDesc] = useState("");

  if (!window._serviceRequests[service._id]) {
    window._serviceRequests[service._id] = { checked: false, desc: "" };
  }

  const toggle = () => {
    const newState = !checked;
    setChecked(newState);
    window._serviceRequests[service._id].checked = newState;
  };

  const handleDescChange = (e) => {
    const text = e.target.value;
    setDesc(text);
    window._serviceRequests[service._id].desc = text;
  };

  return (
    <div className="box" style={{ marginBottom: "20px", padding: "15px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input type="checkbox" checked={checked} onChange={toggle} />
        <h4>{service.title}</h4>
      </div>

      <p style={{ opacity: 0.8 }}>{service.shortDescription}</p>

      {checked && (
        <textarea
          placeholder="Describe what you need..."
          className="form-control"
          value={desc}
          onChange={handleDescChange}
          style={{
            marginTop: "10px",
            minHeight: "80px",
            resize: "vertical",
          }}
        ></textarea>
      )}
    </div>
  );
}
