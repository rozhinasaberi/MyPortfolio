import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";

import Signup from "./signup.jsx";
import Login from "./Login.jsx";

export default function App() {
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
                <a href="#home" className="navbar-brand d-flex align-items-center gap-2">
                  <img src="/logo.png" alt="Rojina Logo" style={{ height: 40 }} />
                  <span className="brand-text"></span>
                </a>

                <ul className="nav ms-auto">
                  <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
                  <li className="nav-item"><a className="nav-link" href="#about">About Me</a></li>
                  <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                  <li className="nav-item"><a className="nav-link" href="#projects">Projects</a></li>
                  <li className="nav-item"><a className="nav-link" href="#form">Contact</a></li>

                  {/* NEW — separate pages */}
                  <li className="nav-item"><a className="nav-link" href="/signup">Sign Up</a></li>
                  <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
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
                      Hi, I'm <strong>Rojina Saberi</strong>. I want to contribute my abilities to a
                      forward thinking firm that values innovation, cooperation, and growth.
                    </p>
                    <p className="mission">
                      My mission is to leverage technology to create impactful, efficient, and
                      meaningful digital experiences.
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
                  <img src="/photo.jpg" alt="Headshot of Rojina Saberi" className="hero-photo" />
                  <h1 className="hero-title">Rojina Saberi</h1>
                  <p className="hero-subtitle">Software Developer and IT Analyst</p>
                </div>

                <div className="about-container">
                  <h2>
                    Detail-oriented and solution-driven IT expert with a solid background in technical
                    support, system administration, and enterprise technologies…
                  </h2>
                  <p>
                    Seeking opportunities to provide IT and administrative support for infrastructure,
                    project management, or application teams.
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

            {/* SERVICES SECTION */}
            <section id="services" className="services section-bg">
  <div className="container">
    <div className="section-title">
      <h2>Services</h2>
      <p>What I can help you with</p>
    </div>

    <div className="row">
      {services.map((service) => (
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch"
          key={service._id}
        >
          <div className="icon-box">
            {service.icon && (
              <div className="icon">
                <i className={service.icon}></i>
              </div>
            )}
            <h4>{service.title}</h4>
            <p>{service.shortDescription}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


            {/* PROJECTS SECTION */}
            <section id="projects" className="Projectsection">
              <div className="container">
                <h2 className="h2-heading">Delivered Projects</h2>
                <p className="p-heading">
                  Here are some of the projects I've worked on, with my role and the outcomes.
                </p>

                <div className="row g-4">
                  <div className="col-lg-4 col-md-6">
                    <div className="card project-card">
                      <img src="/shop.png" className="card-img-top" alt="Sticker Shop" />
                      <div className="card-body">
                        <h5 className="card-title">Online Shop</h5>
                        <p className="card-text">
                          <strong>My Role:</strong> Frontend development using HTML/CSS.
                          <br />
                          <strong>Outcome:</strong> Fully functional static site.
                        </p>
                        <a href="https://rozhinasaberi.github.io/ITEC3020a1/" className="btn btn-visitpage">
                          Visit Shop
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="card project-card">
                      <img src="/bloodbank.png" className="card-img-top" alt="Blood Bank" />
                      <div className="card-body">
                        <h5 className="card-title">Blood Bank Management</h5>
                        <p className="card-text">
                          <strong>My Role:</strong> UML diagrams + Agile sprints.
                        </p>
                        <a href="/Project_07_FullPlan.pdf" className="btn btn-visitpage" download>
                          Download Project
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="card project-card">
                      <img src="/price.png" className="card-img-top" alt="McDonald's Data Analysis" />
                      <div className="card-body">
                        <h5 className="card-title">Pricing Strategies Analysis</h5>
                        <p className="card-text">
                          <strong>My Role:</strong> Data cleaning, Python UI, clustering.
                        </p>
                        <a href="/ITEC4230Report.pdf" className="btn btn-visitpage" download>
                          Download Report
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* CONTACT FORM */}
            <section id="form">
              <div className="container">
                <h2 className="text-center mb-4">Let's be in touch!</h2>

                <form className="mx-auto" style={{ maxWidth: 720 }}>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" placeholder="Your name.." />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" placeholder="Your last name.." />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <select className="form-select" defaultValue="canada">
                      <option value="canada">Canada</option>
                      <option value="usa">USA</option>
                      <option value="uk">UK</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="5"></textarea>
                  </div>

                  <button type="submit" className="btn btn-visitpage">Send</button>
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
