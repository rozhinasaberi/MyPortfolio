import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";

import Signup from "./signup.jsx";
import Login from "./Login.jsx";

export default function App() {
  // 🟡 NEW: services state + loading/error
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);

  // 🟡 NEW: fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/services");
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

  return (
    <Routes>
      {/* =======================
          FULL PORTFOLIO HOME PAGE
      ======================== */}
      <Route
        path="/"
        element={
          <>
            {/* Navbar */}
            <header id="header" className="fixed-top">
              <nav className="navbar container">
                <a
                  href="#home"
                  className="navbar-brand d-flex align-items-center gap-2"
                >
                  <img
                    src="/logo.png"
                    alt="Rojina Logo"
                    style={{ height: 40 }}
                  />
                  <span className="brand-text"></span>
                </a>

                <ul className="nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#home">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#about">
                      About Me
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#services">
                      Services
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#projects">
                      Projects
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#form">
                      Contact
                    </a>
                  </li>

                  {/* NEW — separate pages */}
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">
                      Sign Up
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </ul>
              </nav>
            </header>

            {/* HOME SECTION */}
            <section id="home" className="home">
              <div className="container h-100">
                <div className="row h-100 hero-row">
                  <div className="container">
                    <h1>Welcome to My Portfolio</h1>
                    <p className="lead">
                      Hi, I'm <strong>Rojina Saberi</strong>. I want to
                      contribute my abilities to a forward thinking firm that
                      values innovation, cooperation, and growth.
                    </p>
                    <p className="mission">
                      My mission is to leverage technology to create impactful,
                      efficient, and meaningful digital experiences.
                    </p>
                    <a href="#about" className="btn btn-visitpage">
                      Learn More About Me
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="aboutsection about-stack">
              <div className="container">
                <div className="about-stack-inner">
                  <img
                    src="/photo.jpg"
                    alt="Headshot of Rojina Saberi"
                    className="hero-photo"
                  />
                  <h1 className="hero-title">Rojina Saberi</h1>
                  <p className="hero-subtitle">
                    Software Developer and IT Analyst
                  </p>
                </div>

                <div className="about-container">
                  <h2>
                    Detail-oriented and solution-driven IT expert with a solid
                    background in technical support, system administration, and
                    enterprise technologies…
                  </h2>
                  <p>
                    Seeking opportunities to provide IT and administrative
                    support for infrastructure, project management, or
                    application teams.
                  </p>
                  <a
                    href="/Rojina-Saberi.pdf"
                    className="btn-visitpage"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </section>

            {/* 🟣 SERVICES SECTION — NOW DYNAMIC */}
            <section id="services" className="Servicesection">
              <div className="container text-center">
                <h4 className="h4-heading">Services</h4>
                <p className="p-heading">
                  Skilled in Python, C, Java, JavaScript, HTML, CSS, and
                  database management (MySQL). Experienced with VS Code, SQL
                  Developer, Eclipse, and MDM tools.
                </p>

                {servicesLoading && <p>Loading services...</p>}
                {servicesError && (
                  <p style={{ color: "red" }}>{servicesError}</p>
                )}

                <div className="row g-3">
                  {!servicesLoading &&
                    !servicesError &&
                    services.length === 0 && (
                      <p>No services added yet.</p>
                    )}

                  {services.map((service) => (
                    <div className="col-md-3" key={service._id}>
                      <div className="text-box">
                        <h4>{service.title}</h4>
                        <p>{service.shortDescription}</p>
                        {/* if you later add more fields (like bullet points),
                            you can render them here */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PROJECTS SECTION (unchanged for now) */}
            <section id="projects" className="Projectsection">
              <div className="container">
                <h2 className="h2-heading">Delivered Projects</h2>
                <p className="p-heading">
                  Here are some of the projects I've worked on, with my role and
                  the outcomes.
                </p>

                <div className="row g-4">
                  <div className="col-lg-4 col-md-6">
                    <div className="card project-card">
                      <img
                        src="/shop.png"
                        className="card-img-top"
                        alt="Sticker Shop"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Online Shop</h5>
                        <p className="card-text">
                          <strong>My Role:</strong> Frontend development using
                          HTML/CSS.
                          <br />
                          <strong>Outcome:</strong> Fully functional static
                          site.
                        </p>
                        <a
                          href="https://rozhinasaberi.github.io/ITEC3020a1/"
                          className="btn btn-visitpage"
                        >
                          Visit Shop
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="card project-card">
                      <img
                        src="/bloodbank.png"
                        className="card-img-top"
                        alt="Blood Bank"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Blood Bank Management
                        </h5>
                        <p className="card-text">
                          <strong>My Role:</strong> UML diagrams + Agile
                          sprints.
                        </p>
                        <a
                          href="/Project_07_FullPlan.pdf"
                          className="btn btn-visitpage"
                          download
                        >
                          Download Project
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="card project-card">
                      <img
                        src="/price.png"
                        className="card-img-top"
                        alt="McDonald's Data Analysis"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Pricing Strategies Analysis
                        </h5>
                        <p className="card-text">
                          <strong>My Role:</strong> Data cleaning, Python UI,
                          clustering.
                        </p>
                        <a
                          href="/ITEC4230Report.pdf"
                          className="btn btn-visitpage"
                          download
                        >
                          Download Report
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

                        {/* CONTACT FORM (now connected to backend) */}
                        <section id="form">
              <div className="container">
                <h2 className="text-center mb-4">Let's be in touch!</h2>

                {contactStatus && (
                  <p className="text-center" style={{ color: contactStatus.startsWith("Thank") ? "green" : "red" }}>
                    {contactStatus}
                  </p>
                )}

                <form
                  className="mx-auto"
                  style={{ maxWidth: 720 }}
                  onSubmit={handleContactSubmit}
                >
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Your full name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="you@example.com"
                      value={contactForm.email}
                      onChange={handleContactChange}
                    />
                  </div>

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
                      placeholder="Write your message here..."
                      value={contactForm.message}
                      onChange={handleContactChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-visitpage"
                    disabled={contactLoading}
                  >
                    {contactLoading ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </section>

           
          </>
        }
      />

      {/* ====================
          SIGNUP PAGE
      ==================== */}
      <Route path="/signup" element={<Signup />} />

      {/* ====================
          LOGIN PAGE
      ==================== */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
