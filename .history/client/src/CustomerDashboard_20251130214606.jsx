// client/src/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";

export default function CustomerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("services"); // 'services' | 'messages' | 'projects'

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    //  SERVICES for this user
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/services/user/${user._id}`
        );
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        setServices(data || []);
      } catch (err) {
        console.error("Error fetching user services:", err);
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    };

    //  CONTACT MESSAGES filtered by email
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/contacts");
        if (!res.ok) throw new Error("Failed to load messages");
        const data = await res.json();
        const filtered =
          Array.isArray(data) && user.email
            ? data.filter((m) => m.email === user.email)
            : [];
        setMessages(filtered);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setMessages([]);
      } finally {
        setMessagesLoading(false);
      }
    };

    // PROJECTS (all – these are *your* projects)
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/projects");
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchServices();
    fetchMessages();
    fetchProjects();
  }, [user]);

  if (!user) {
    return <p>Please log in to see your dashboard.</p>;
  }

  return (
    <div className="customer-dashboard" style={{ marginTop: "2rem" }}>
      <h3 className="text-center mb-3">
        Welcome back, {user.name || user.email}
      </h3>

      {/* Tabs */}
      <div
        className="tab-buttons"
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button
          className={
            activeTab === "services"
              ? "btn btn-visitpage"
              : "btn btn-visitpage-outline"
          }
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
        <button
          className={
            activeTab === "messages"
              ? "btn btn-visitpage"
              : "btn btn-visitpage-outline"
          }
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>
        <button
          className={
            activeTab === "projects"
              ? "btn btn-visitpage"
              : "btn btn-visitpage-outline"
          }
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === "services" && (
          <ServicesTab loading={servicesLoading} services={services} />
        )}

        {activeTab === "messages" && (
          <MessagesTab loading={messagesLoading} messages={messages} />
        )}

        {activeTab === "projects" && (
          <ProjectsTab loading={projectsLoading} projects={projects} />
        )}
      </div>
    </div>
  );
}

function ServicesTab({ loading, services }) {
  if (loading) return <p>Loading your services...</p>;
  if (!services.length) return <p>You have no recorded services yet.</p>;

  return (
    <div className="row g-3">
      {services.map((s) => (
        <div key={s._id} className="col-md-4">
          <div className="card p-3">
            <h5>{s.title}</h5>
            {s.shortDescription && <p>{s.shortDescription}</p>}
            {s.date && (
              <small className="text-muted">
                Date: {new Date(s.date).toLocaleDateString()}
              </small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function MessagesTab({ loading, messages }) {
  if (loading) return <p>Loading your messages...</p>;
  if (!messages.length) return <p>No messages found for your email yet.</p>;

  return (
    <div className="list-group">
      {messages.map((m) => (
        <div key={m._id} className="list-group-item">
          <strong>{m.subject || "No subject"}</strong>
          <p style={{ marginBottom: 4 }}>{m.message}</p>
          {m.createdAt && (
            <small className="text-muted">
              Sent: {new Date(m.createdAt).toLocaleString()}
            </small>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectsTab({ loading, projects }) {
  if (loading) return <p>Loading projects...</p>;
  if (!projects.length) return <p>No projects to show yet.</p>;

  return (
    <div className="row g-3">
      {projects.map((p) => (
        <div key={p._id} className="col-md-4">
          <div className="card h-100">
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                className="card-img-top"
                alt={p.title || "Project"}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{p.title}</h5>
              <p className="card-text">
                {p.description ||
                  (p.techStack && p.techStack.join(", ")) ||
                  "No description"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
