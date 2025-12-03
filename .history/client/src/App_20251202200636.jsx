// client/src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Signup from "./signup.jsx";
import Login from "./Login.jsx";
import CustomerDashboard from "./CustomerDashboard.jsx";

// Your deployed backend
const API = "https://myportfolio-1-adrz.onrender.com";

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const isAdmin = role === "admin";

  // AUTH STATE
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [authStep, setAuthStep] = useState(
    authenticatedUser ? "dashboard" : "login"
  );

  const handleAuthSuccess = (user) => {
    setAuthenticatedUser(user);
    setAuthStep("dashboard");
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setAuthStep("login");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  // SERVICES
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => setServices([]))
      .finally(() => setServicesLoading(false));
  }, []);

  // PROJECTS
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setProjectsLoading(false));
  }, []);

  // CONTACT FORM
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  });

  const [contactStatus, setContactStatus] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus(null);

    if (!contactForm.message.trim()) {
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
      const res = await fetch(`${API}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setContactStatus("Thank you! Your message has been sent.");
      setContactForm({ subject: "", message: "" });
    } catch (err) {
      setContactStatus("Something went wrong. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  // ============= UI =============

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* NAVBAR */}
            <header id="header" className="fixed-top">
              <nav className="navbar container d-flex align-items-center">
                <a className="navbar-brand logo">Rojina</a>

                <ul className="nav ms-auto align-items-center">
                  <li className="nav-item">
                    <a className="nav-link" href="#about">About</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#services">Services</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#projects">Projects</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#form">Contact</a>
                  </li>

                  {!authenticatedUser && (
                    <>
                      <li className="nav-item">
                        <button
                          className="nav-link btn-as-link"
                          onClick={() => setAuthStep("signup")}
                        >
                          Sign Up
                        </button>
                      </li>

                      <li className="nav-item">
                        <button
                          className="nav-link btn-as-link"
                          onClick={() => setAuthStep("login")}
                        >
                          Login
                        </button>
                      </li>
                    </>
                  )}

                  {authenticatedUser && (
                    <li className="nav-item">
                      <button
                        className="nav-link btn-as-link"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  )}

                  {isAdmin && (
                    <li className="nav-item">
                      <span className="badge bg-dark ms-2">Admin</span>
                    </li>
                  )}
                </ul>
              </nav>
            </header>

            {/* ABOUT SECTION */}
            <section id="about" className="aboutsection">
              <div
                className="container"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.3fr",
                  gap: "2.5rem",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <img
                    src="/photo.jpg"
                    className="hero-photo"
                    alt="Rojina"
                  />
                </div>

                <div>
                  <h2>About Me</h2>
                  <h1 className="hero-title">Rojina Saberi</h1>
                  <p className="hero-subtitle">Software Developer & IT Analyst</p>

                  <p style={{ lineHeight: "1.7", marginBottom: 20 }}>
                    I build full-stack applications, dashboards, and integrations...
                  </p>

                  <div style={{ display: "flex", gap: 12 }}>
                    <a href="/Rojina-Saberi.pdf" className="btn-visitpage">Résumé</a>
                    <a href="https://github.com/rozhinasaberi" className="btn-link">GitHub</a>
                    <a href="https://linkedin.com/in/rojinasaberi" className="btn-link">LinkedIn</a>
                  </div>
                </div>
              </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="Servicesection">
              <div className="container">
                <h3>Services</h3>

                {servicesLoading && <p>Loading...</p>}

                <div className="row g-3">
                  {services.map((s) => (
                    <div className="col-md-3" key={s._id}>
                      <div className="text-box">
                        <h4>{s.title}</h4>
                        <p>{s.shortDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="Projectsection">
              <div className="container">
                <h3>Delivered Projects</h3>

                <div className="row g-4">
                  {projects.map((p) => (
                    <div className="col-lg-4 col-md-6" key={p._id}>
                      <div className="project-card">
                        {p.imageUrl && (
                          <img src={p.imageUrl} className="card-img-top" alt="" />
                        )}

                        <div className="card-body">
                          <h5 className="card-title">{p.title}</h5>
                          <p className="card-text">{p.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACT + AUTH FORMS */}
            <section id="form">
              <div className="container">
                <h2>Let's be in touch!</h2>

                {authStep === "login" && (
                  <Login onSuccess={handleAuthSuccess} setRole={setRole} />
                )}

                {authStep === "signup" && (
                  <Signup onSuccess={handleAuthSuccess} />
                )}

                {authStep !== "dashboard" && (
                  <p className="text-center">
                    {authStep === "login" ? (
                      <>
                        Don’t have an account?{" "}
                        <button className="btn btn-link" onClick={() => setAuthStep("signup")}>
                          Sign Up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button className="btn btn-link" onClick={() => setAuthStep("login")}>
                          Login
                        </button>
                      </>
                    )}
                  </p>
                )}

                {authStep === "dashboard" && authenticatedUser && (
                  <>
                    <CustomerDashboard user={authenticatedUser} onLogout={handleLogout} />

                    <h3 className="text-center mt-4">Send me a message</h3>

                    <form style={{ maxWidth: 720, margin: "0 auto" }} onSubmit={handleContactSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleContactChange}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                          name="message"
                          rows="5"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          className="form-control"
                        />
                      </div>

                      <button className="btn-visitpage" type="submit">
                        {contactLoading ? "Sending..." : "Send"}
                      </button>

                      {contactStatus && <p>{contactStatus}</p>}
                    </form>
                  </>
                )}
              </div>
            </section>
          </>
        }
      />

     
      <Route path="/signup" element={<Signup onSuccess={handleAuthSuccess} />} />
      <Route path="/login" element={<Login onSuccess={handleAuthSuccess} setRole={setRole} />} />
    </Routes>
  );
}
