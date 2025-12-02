import React, { useState, useEffect } from "react";

export default function CustomerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("services");

  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);

  // ------------------------
  // Fetch Services
  // ------------------------
  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Services fetch error:", err));
  }, []);

  // ------------------------
  // Fetch User Messages
  // ------------------------
  useEffect(() => {
    fetch(`http://localhost:3000/api/contacts/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Messages fetch error:", err));
  }, [user._id]);

  // ------------------------
  // Fetch User Projects
  // ------------------------
  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${user._id}/projects`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Customer projects:", data);
        setProjects(data);
      })
      .catch((err) => console.error("Project fetch error:", err));
  }, [user._id]);

  return (
    <div className="container">
      <h2>Welcome back, {user.name}</h2>

      {/* TABS */}
      <div className="tab-buttons" style={{ marginBottom: "20px" }}>
        <button
          className={activeTab === "services" ? "active-tab" : ""}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>

        <button
          className={activeTab === "messages" ? "active-tab" : ""}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>

        <button
          className={activeTab === "projects" ? "active-tab" : ""}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
      </div>

      {/* ------------------------- */}
      {/* TAB CONTENT */}
      {/* ------------------------- */}

      {/* SERVICES TAB */}
      {activeTab === "services" && (
        <div>
          <h3>Your Available Services</h3>
          {services.length === 0 ? (
            <p>No services available at the moment.</p>
          ) : (
            services.map((s) => (
              <div key={s._id} className="box">
                <h4>{s.title}</h4>
                <p>{s.shortDescription}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === "messages" && (
        <div>
          <h3>Your Messages</h3>

          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((m) => (
              <div key={m._id} className="box">
                <p><strong>Subject:</strong> {m.subject}</p>
                <p>{m.message}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === "projects" && (
        <div>
          <h3>Your Ordered Projects</h3>

          {projects.length === 0 ? (
            <p>You have no completed projects yet.</p>
          ) : (
            projects.map((p) => (
              <div className="box" key={p._id}>
                <h4>{p.title}</h4>
                <p>{p.description}</p>

                {p.deliveryUrl && (
                  <a
                    href={p.deliveryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    View Delivered Project
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
