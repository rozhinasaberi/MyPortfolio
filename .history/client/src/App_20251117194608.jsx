import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>

      {/* ================= NAVBAR ================= */}
      <header id="header" className="fixed-top">
        <nav className="navbar container">

          <a href="/#home" className="navbar-brand d-flex align-items-center gap-2">
            <img src="/logo.png" alt="Rojina Logo" style={{ height: 40 }} />
          </a>

          <ul className="nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="/#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/#about">About Me</a></li>
            <li className="nav-item"><a className="nav-link" href="/#services">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="/#projects">Projects</a></li>
            <li className="nav-item"><a className="nav-link" href="/#contact">Contact</a></li>

            {/* React Router links */}
            <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          </ul>

        </nav>
      </header>

      {/* ================= HOME SECTION ================= */}
      <section id="home" className="home">
        <div className="container h-100">
          <div className="row h-100 hero-row">
            <div className="container">
              <h1>Welcome to My Portfolio</h1>
              <p className="lead">
                Hi, I'm <strong>Rojina Saberi</strong>. I want to contribute my abilities to a
                forward-thinking firm that values innovation, cooperation, and growth.
              </p>
              <p className="mission">
                My mission is to leverage technology to create impactful and meaningful digital experiences.
              </p>
              <a href="/#about" className="btn btn-visitpage">Learn More About Me</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="aboutsection about-stack">
        <div className="container">

          <div className="about-stack-inner">
            <img src="/photo.jpg" alt="Rojina Saberi" className="hero-photo" />
            <h1 className="hero-title">Rojina Saberi</h1>
            <p className="hero-subtitle">Software Developer & IT Analyst</p>
          </div>

          <div className="about-container">
            <h2>
              Detail-oriented and solution-driven IT expert with background in technical support,
              system administration, and enterprise technologies…
            </h2>
            <p>
              Seeking opportunities to support infrastructure, project management, or application teams.
            </p>

            <a href="/Rojina-Saberi.pdf"
               className="btn-visitpage"
               target="_blank"
               rel="noreferrer">
              Resume
            </a>
          </div>

        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="Servicesection">
        <div className="container text-center">

          <h4 className="h4-heading">Services</h4>
          <p className="p-heading">
            Skilled in Python, C, Java, JavaScript, HTML, CSS, database management,
            and enterprise IT tools.
          </p>

          <div className="row g-3">

            <div className="col-md-3">
              <div className="text-box">
                <h4>Technical Support</h4>
                <p>Fast and friendly resolution for laptops, accounts, and onboarding.</p>
                <ul>
                  <li>Ticket triage & remote help</li>
                  <li>User onboarding</li>
                </ul>
              </div>
            </div>

            <div className="col-md-3">
              <div className="text-box">
                <h4>Systems & Administration</h4>
                <p>Maintain healthy corporate IT environments.</p>
                <ul>
                  <li>Active Directory, M365</li>
                  <li>Intune, device management</li>
                </ul>
              </div>
            </div>

            <div className="col-md-3">
              <div className="text-box">
                <h4>Networking & Security</h4>
                <p>Secure and stable connectivity solutions.</p>
                <ul>
                  <li>LAN/WAN, VLANs, VPN</li>
                  <li>MFA, DLP, endpoint security</li>
                </ul>
              </div>
            </div>

            <div className="col-md-3">
              <div className="text-box">
                <h4>Software Development</h4>
                <p>Web apps and backend APIs.</p>
                <ul>
                  <li>React, Node.js, MongoDB</li>
                  <li>Java, Python</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="Projectsection">
        <div className="container">

          <h2 className="h2-heading">Delivered Projects</h2>
          <p className="p-heading">A few of the things I've built or contributed to:</p>

          <div className="row g-4">

            <div className="col-lg-4 col-md-6">
              <div className="card project-card">
                <img src="/shop.png" className="card-img-top" alt="Sticker Shop" />
                <div className="card-body">
                  <h5>Online Sticker Shop</h5>
                  <p>Designed and coded the frontend.</p>
                  <a href="https://rozhinasaberi.github.io/ITEC3020a1/"
                     className="btn btn-visitpage">Visit Shop</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card project-card">
                <img src="/bloodbank.png" className="card-img-top" alt="Blood Bank" />
                <div className="card-body">
                  <h5>Blood Bank Management System</h5>
                  <p>UML, sprints, and system documentation.</p>
                  <a href="/Project_07_FullPlan.pdf"
                     className="btn btn-visitpage" download>
                    Download Project
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card project-card">
                <img src="/price.png" className="card-img-top" alt="Pricing Analysis" />
                <div className="card-body">
                  <h5>McDonald's Pricing Strategy</h5>
                  <p>Data cleaning, clustering, Python UI.</p>
                  <a href="/ITEC4230Report.pdf"
                     className="btn btn-visitpage" download>
                    Download Report
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact">
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
                <option value="uk">UK</option>
                <option value="usa">USA</option>
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
  );
}
