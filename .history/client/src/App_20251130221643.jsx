// client/src/App.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Signup from "./signup.jsx";
import Login from "./Login.jsx";
import CustomerDashboard from "./CustomerDashboard.jsx"; // NEW

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const isAdmin = role === "admin";

  // ============================================
  // AUTH SYSTEM FOR CONTACT SECTION
  // ============================================
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authStep, setAuthStep] = useState("login"); // login | signup | dashboard

  // ============================================
  // SERVICES FETCH
  // ============================================
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("https://myportfolio-j9tp.onrender.com/api/services");

        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setServicesError("Failed to load services.");
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ============================================
  // PROJECTS FETCH
  // ============================================
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://myportfolio-j9tp.onrender.com/api/projects");

        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjectsError("Failed to load projects.");
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ============================================
  // CONTACT FORM
  // ============================================
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  });

  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus(null);

    if (!contactForm.message) {
      setContactStatus("Message cannot be empty.");
      return;
    }

    // auto-fill user info after login
    const body = {
      name: authenticatedUser?.name || "",
      email: authenticatedUser?.email || "",
      subject: contactForm.subject,
      message: contactForm.message,
    };

    try {
      setContactLoading(true);
      const res = await fetch("https://myportfolio-j9tp.onrender.com/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setContactStatus("Thank you! Your message has been sent.");
      setContactForm({
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("ERROR sending message:", err);
      setContactStatus("Something went wrong. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  // ============================================
  // RETURN UI
  // ============================================
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* =======================================================
                NAVBAR
            ======================================================= */}
            <header id="header" className="fixed-top">
              <nav className="navbar container">
                <a href="#home" className="navbar-brand d-flex align-items-center gap-2">
                  <img src="/logo.png" alt="Rojina Logo" style={{ height: 40 }} />
                </a>

                <ul className="nav ms-auto align-items-center">
                  <li className="nav-item">
                    <a className="nav-link" href="#home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#about">About Me</a>
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

                  {/* Auth redirect pages */}
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">Sign Up</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>

                  {isAdmin && (
                    <li className="nav-item">
                      <span className="badge bg-dark ms-2">Admin</span>
                    </li>
                  )}
                </ul>
              </nav>
            </header>

            {/* =======================================================
                HOME
            ======================================================= */}
            <section id="home" className="home">
              <div className="container h-100">
                <h1>Welcome to My Portfolio</h1>
                <p className="lead">
                  Hi, I'm <strong>Rojina Saberi</strong>.
                </p>
              </div>
            </section>

            {/* =======================================================
                ABOUT
            ======================================================= */}
            <section id="about" className="aboutsection about-stack">
              <div className="container">
                <img src="/photo.jpg" className="hero-photo" alt="Profile" />

                <h1 className="hero-title">Rojina Saberi</h1>
                <p className="hero-subtitle">Software Developer & IT Analyst</p>
              </div>
            </section>

            {/* =======================================================
                SERVICES
            ======================================================= */}
            <section id="services" className="Servicesection">
              <div className="container">
                <h4>Services</h4>

                {servicesLoading && <p>Loading...</p>}
                {servicesError && <p style={{ color: "red" }}>{servicesError}</p>}

                <div className="row g-3">
                  {services.map((service) => (
                    <div className="col-md-3" key={service._id}>
                      <div className="text-box">
                        <h4>{service.title}</h4>
                        <p>{service.shortDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =======================================================
                PROJECTS
            ======================================================= */}
            <section id="projects" className="Projectsection">
              <div className="container">
                <h2>Delivered Projects</h2>

                <div className="row g-4">
                  {projects.map((project) => (
                    <div className="col-lg-4 col-md-6" key={project._id}>
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

            {/* =======================================================
                CONTACT (LOGIN → SIGNUP → DASHBOARD)
            ======================================================= */}
            <section id="form">
              <div className="container">
                <h2 className="text-center mb-4">Let's be in touch!</h2>

                {/* LOGIN SCREEN */}
                {authStep === "login" && (
                  <Login
                    onSuccess={(user) => {
                      setAuthenticatedUser(user);
                      setAuthStep("dashboard");
                    }}
                  />
                )}

                {/* SIGNUP SCREEN */}
                {authStep === "signup" && (
                  <Signup
                    onSuccess={(user) => {
                      setAuthenticatedUser(user);
                      setAuthStep("dashboard");
                    }}
                  />
                )}

                {/* SWITCH LOGIN ↔ SIGNUP */}
                {authStep !== "dashboard" && (
                  <p className="text-center">
                    {authStep === "login" ? (
                      <>
                        Don’t have an account?{" "}
                        <button
                          onClick={() => setAuthStep("signup")}
                          className="btn btn-link"
                        >
                          Sign Up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={() => setAuthStep("login")}
                          className="btn btn-link"
                        >
                          Login
                        </button>
                      </>
                    )}
                  </p>
                )}

                {/* DASHBOARD */}
                {authStep === "dashboard" && authenticatedUser && (
                  <>
                    <CustomerDashboard user={authenticatedUser} />

                    <h3 className="text-center mt-4">Send me a message</h3>

                    <form
                      className="mx-auto"
                      style={{ maxWidth: 720 }}
                      onSubmit={handleContactSubmit}
                    >
                      <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Reason for reaching out"
                          value={contactForm.subject}
                          onChange={handleContactChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          rows="5"
                          name="message"
                          placeholder="Write your message..."
                          value={contactForm.message}
                          onChange={handleContactChange}
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-visitpage">
                        {contactLoading ? "Sending..." : "Send"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </section>
          </>
        }
      />

      {/* SIGNUP PAGE */}
      <Route path="/signup" element={<Signup />} />

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login setRole={setRole} />} />
    </Routes>
  );
}
