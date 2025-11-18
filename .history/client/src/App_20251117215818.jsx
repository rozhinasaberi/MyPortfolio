// client/src/App.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Signup from "./signup.jsx";
import Login from "./Login.jsx";

export default function App() {

  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const isAdmin = role === "admin";

 
  // SERVICES 

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/services");
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


  // PROJECTS STATE

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/projects");
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

  // ==========================
  // CONTACT FORM STATE
  // ==========================
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
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

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus("Please fill in your name, email, and message.");
      return;
    }

    try {
      setContactLoading(true);
      const res = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setContactStatus("Thank you! Your message has been sent.");
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error sending contact form:", err);
      setContactStatus("Something went wrong. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

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

                <ul className="nav ms-auto align-items-center">
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

                  {/* auth links */}
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

                  {/* small admin badge if role is admin */}
                  {isAdmin && (
                    <li className="nav-item">
                      <span className="badge bg-dark ms-2">Admin</span>
                    </li>
                  )}
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

            {/* SERVICES SECTION (dynamic) */}
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PROJECTS SECTION (dynamic) */}
            <section id="projects" className="Projectsection">
              <div className="container">
                <h2 className="h2-heading">Delivered Projects</h2>
                <p className="p-heading">
                  Here are some of the projects I've worked on, with my role and
                  the outcomes.
                </p>

                {projectsLoading && <p>Loading projects...</p>}
                {projectsError && (
                  <p style={{ color: "red" }}>{projectsError}</p>
                )}

                <div className="row g-4">
                  {!projectsLoading &&
                    !projectsError &&
                    projects.length === 0 && (
                      <p>No projects added yet.</p>
                    )}

                  {projects.map((project) => (
                    <div className="col-lg-4 col-md-6" key={project._id}>
                      <div className="card project-card">
                        {project.imageUrl && (
                          <img
                            src={project.imageUrl}
                            className="card-img-top"
                            alt={project.title}
                          />
                        )}
                        <div className="card-body">
                          <h5 className="card-title">{project.title}</h5>
                          <p className="card-text">
                            {project.description ||
                              (project.techStack &&
                                project.techStack.join(", "))}
                          </p>

                          <div className="d-flex gap-2 flex-wrap">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                className="btn btn-visitpage"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Visit Project
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                className="btn btn-visitpage-outline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                View on GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACT FORM (connected to backend) */}
            <section id="form">
              <div className="container">
                <h2 className="text-center mb-4">Let's be in touch!</h2>

                {contactStatus && (
                  <p
                    className="text-center"
                    style={{
                      color: contactStatus.startsWith("Thank")
                        ? "green"
                        : "red",
                    }}
                  >
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

      {/* SIGNUP PAGE */}
      <Route path="/signup" element={<Signup />} />

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login setRole={setRole} />} />
    </Routes>
  );
}
