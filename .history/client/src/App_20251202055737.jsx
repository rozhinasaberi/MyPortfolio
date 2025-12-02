// client/src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Signup from "./signup.jsx";
import CustomerDashboard from "./CustomerDashboard.jsx";
import Services from "./Services.jsx";
import Projects from "./Projects.jsx";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (!user && page === "dashboard") {
      setPage("login");
    }
  }, [user, page]);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setPage("home");
  };

  const renderContent = () => {
    if (page === "login") {
      return <Login onLogin={handleLogin} goSignup={() => setPage("signup")} />;
    }
    if (page === "signup") {
      return <Signup goLogin={() => setPage("login")} />;
    }
    if (page === "dashboard" && user) {
      return <CustomerDashboard user={user} onLogout={handleLogout} />;
    }

    // PUBLIC LANDING PAGE
    return (
      <>
        {/* Hero / About */}
        <section className="hero-section">
          <div className="hero-inner">
            <h1>Hi, I’m Rojina.</h1>
            <p>
              Software Developer &amp; IT Analyst focused on building tools that
              actually support people’s workflows.
            </p>
            <div className="hero-buttons">
              <a
                href="YOUR_RESUME_LINK_HERE"
                target="_blank"
                rel="noreferrer"
                className="btn hero-btn"
              >
                View My Résumé
              </a>
              <a
                href="https://github.com/rozhinasaberi"
                target="_blank"
                rel="noreferrer"
                className="btn hero-btn-outline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rozhinasaberi"
                target="_blank"
                rel="noreferrer"
                className="btn hero-btn-outline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section">
          <h2>Services</h2>
          <Services />
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <h2>Delivered Projects</h2>
          <Projects />
        </section>
      </>
    );
  };

  return (
    <div className="app-root">
      {/* NAVBAR */}
      <header className="main-nav">
        <div className="nav-inner">
          <div className="nav-logo">Rojina</div>
          <nav className="nav-links">
            <button onClick={() => setPage("home")} className="nav-link">
              Home
            </button>
            <button
              onClick={() => {
                setPage("home");
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="nav-link"
            >
              Services
            </button>
            <button
              onClick={() => {
                setPage("home");
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="nav-link"
            >
              Projects
            </button>

            {!user && (
              <>
                <button
                  onClick={() => setPage("signup")}
                  className="nav-link"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setPage("login")}
                  className="nav-link"
                >
                  Login
                </button>
              </>
            )}

            {user && (
              <>
                <button
                  onClick={() => setPage("dashboard")}
                  className="nav-link"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="nav-link nav-link-logout"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default App;
