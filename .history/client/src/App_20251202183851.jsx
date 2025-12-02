// client/src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Signup from "./signup.jsx";
import Login from "./Login.jsx";
import CustomerDashboard from "./CustomerDashboard.jsx";

export default function App() {
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const isAdmin = role === "admin";

  // ========= AUTH =========
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [authStep, setAuthStep] = useState(
    authenticatedUser ? "dashboard" : "login"
  );

  const handleAuthSuccess = (user) => {
    setAuthenticatedUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthStep("dashboard");
    navigate("/"); // Stay on main page
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setAuthStep("login");
  };

  // ========= SERVICES =========
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://myportfolio-j9tp.onrender.com/api/services"
        );
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setServicesError("Failed to load services.");
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ========= PROJECTS =========
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "https://myportfolio-j9tp.onrender.com/api/projects"
        );
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setProjectsError("Failed to load projects.");
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ========= CONTACT FORM =========
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  });

  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus(null);

    if (!contactForm.message) {
      setContactStatus("Message cannot be empty.");
      return;
    }

    const body = {
      name: authenticatedUser?.name || "",
      email: authenticatedUser?.email || "",
      subject: contactForm.subject,
      message: contactForm.message,
    };

    try {
      setContactLoading(true);

      const res = await fetch(
        "https://myportfolio-j9tp.onrender.com/api/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Failed to send message");

      setContactStatus("Message sent successfully!");
      setContactForm({ subject: "", message: "" });
    } catch {
      setContactStatus("Something went wrong.");
    } finally {
      setContactLoading(false);
    }
  };

  // ========= MAIN PAGE =========
  const MainPage = (
    <>
      {/* NAVBAR */}
      <header id="header" className="fixed-top">
        <nav className="navbar container">
          <a className="navbar-brand" href="#home">
            <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
          </a>

          <ul className="nav ms-auto">
            <li><a className="nav-link" href="#home">Home</a></li>
            <li><a className="nav-link" href="#about">About</a></li>
            <li><a className="nav-link" href="#services">Services</a></li>
            <li><a className="nav-link" href="#projects">Projects</a></li>
            <li><a className="nav-link" href="#form">Contact</a></li>
            <li><a className="nav-link" href="/signup">Sign Up</a></li>
            <li><a className="nav-link" href="/login">Login</a></li>

            {isAdmin && <span className="badge bg-dark ms-2">Admin</span>}
          </ul>
        </nav>
      </header>

      {/* ABOUT */}
      <section id="about" className="aboutsection">
        <div className="container about-grid">

          <div style={{ textAlign: "center" }}>
            <img
              src="/photo.jpg"
              alt=""
              className="profile-photo"
            />
          </div>

          <div>
            <h2>About Me</h2>
            <h1 className="hero-name">Rojina Saberi</h1>
            <p className="subtitle">Software Developer & IT Analyst</p>

            <p className="about-text">
              I build full-stack applications, dashboards, and integrations...
            </p>

            <div className="about-buttons">
              <a href="/Rojina-Saberi.pdf" target="_blank" className="btn btn-visitpage">Résumé</a>
              <a href="https://github.com/rozhinasaberi" target="_blank" className="btn btn-outline-dark">GitHub</a>
              <a href="https://linkedin.com/in/rojinasaberi" target="_blank" className="btn btn-outline-dark">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="Servicesection">
        <div className="container">
          <h4>Services</h4>

          {servicesLoading && <p>Loading...</p>}
          {servicesError && <p style={{ color: "red" }}>{servicesError}</p>}

          <div className="row g-3">
            {services.map((service) => (
              <div key={service._id} className="col-md-3">
                <div className="text-box">
                  <h4>{service.title}</h4>
                  <p>{service.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="Projectsection">
        <div className="container">
          <h2>Delivered Projects</h2>

          <div className="row g-4">
            {projects.map((project) => (
              <div key={project._id} className="col-lg-4 col-md-6">
                <div className="card project-card">
                  {project.imageUrl && (
                    <img src={project.imageUrl} className="card-img-top" />
                  )}
                  <div className="card-body">
                    <h5>{project.title}</h5>
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + AUTH */}
      <section id="form" className="container">
        {!authenticatedUser && authStep === "login" && (
          <Login onSuccess={handleAuthSuccess} setRole={setRole} />
        )}

        {!authenticatedUser && authStep === "signup" && (
          <Signup onSuccess={handleAuthSuccess} />
        )}

        {authenticatedUser && authStep === "dashboard" && (
          <>
            <CustomerDashboard user={authenticatedUser} onLogout={handleLogout} />

            <form onSubmit={handleContactSubmit} className="contact-form">
              <h3>Send me a message</h3>

              <input
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
                className="form-control mb-2"
                placeholder="Subject"
              />

              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                className="form-control mb-2"
                rows={5}
                placeholder="Message"
              />

              <button className="btn btn-visitpage">
                {contactLoading ? "Sending..." : "Send"}
              </button>

              {contactStatus && <p className="mt-2">{contactStatus}</p>}
            </form>
          </>
        )}
      </section>
    </>
  );

  return (
    <Routes>
      <Route path="/" element={MainPage} />
      <Route path="/signup" element={<Signup onSuccess={handleAuthSuccess} />} />
      <Route path="/login" element={<Login onSuccess={handleAuthSuccess} />} />
    </Routes>
  );
}
