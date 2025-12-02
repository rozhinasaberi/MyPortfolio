import React, { useState, useEffect } from "react";
import "./App.css";

// AUTH
import Signup from "./signup.jsx";
import Login from "./Login.jsx";
import CustomerDashboard from "./CustomerDashboard.jsx";

export default function App() {
  const [authStep, setAuthStep] = useState("home");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (u) => {
    setUser(u);
    setAuthStep("dashboard");
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    setAuthStep("home");
    localStorage.removeItem("user");
  };

  // ===============================
  // SERVICES + PROJECTS FETCH
  // ===============================
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://myportfolio-j9tp.onrender.com/api/services")
      .then((res) => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://myportfolio-j9tp.onrender.com/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  // ===============================
  // RENDER SECTIONS
  // ===============================

  return (
    <>
      {/* FIXED HEADER */}
      <header id="header">
        <nav className="navbar container" style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div className="logo">
            <a href="#home" style={{ fontSize: "26px", fontFamily: "Playfair Display" }}>Rojina</a>
          </div>

          <ul style={{ marginLeft: "auto" }}>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#form">Contact</a></li>
            <li><a onClick={() => setAuthStep("signup")} className="nav-link">Sign Up</a></li>
            <li><a onClick={() => setAuthStep("login")} className="nav-link">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* =============================
          HERO / ABOUT SECTION
      ============================== */}
      <section id="about" className="aboutsection">
        <div className="about-container container">
          <h2>About Me</h2>

          <img src="/photo.jpg" alt="Rojina" className="hero-photo" />

          <h1 className="hero-title">Rojina Saberi</h1>

          <p className="hero-subtitle">Software Developer & IT Analyst</p>

          <p>
            I build full-stack applications, dashboards, and integrations
            that focus on clean UX and reliable data.
          </p>

          <div className="list-social">
            <a href="./Rojina-Saberi.pdf" target="_blank" className="btn-visitpage">Résumé</a>
            <a href="https://github.com/rozhinasaberi" target="_blank">GitHub</a>
            <a href="https://linkedin.com/in/rojinasaberi" target="_blank">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* =============================
          SERVICES
      ============================== */}
      <section id="services" className="Servicesection">
        <h3>Services</h3>

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
      </section>

      {/* =============================
          PROJECTS
      ============================== */}
      <section id="projects" className="Projectsection">
        <h3>Delivered Projects</h3>

        <div className="row g-4">
          {projects.map((p) => (
            <div className="col-lg-4 col-md-6" key={p._id}>
              <div className="project-card">
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    className="card-img-top"
                    alt={p.title}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =============================
          CONTACT + AUTH
      ============================== */}
      <section id="form">
        <div className="container">

          {authStep === "login" && <Login onSuccess={handleLogin} />}
          {authStep === "signup" && <Signup onSuccess={handleLogin} />}

          {user && authStep === "dashboard" && (
            <CustomerDashboard user={user} onLogout={handleLogout} />
          )}
        </div>
      </section>
    </>
  );
}
