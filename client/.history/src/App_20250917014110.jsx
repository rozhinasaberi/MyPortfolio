import React from "react";
import logo from "./assets/logoname.png";     // logo image
import picture from "./assets/picture.jpg";  // profile picture
import "./midterm1.css";                     // CSS file

export default function App() {
  return (
    <>
      {/* HEADER / NAVBAR */}
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <a href="#home" className="logo d-flex align-items-center">
            <img src={logo} alt="Rojina Logo" style={{ height: 40 }} />
          </a>

          {/* Nav links */}
          <nav id="navbar" className="navbar">
            <ul>
              <li><a className="nav-link" href="#home">Home</a></li>
              <li><a className="nav-link" href="#about">About</a></li>
              <li><a className="nav-link" href="#portfolio">Portfolio</a></li>
              <li><a className="nav-link" href="#services">Skills</a></li>
              <li><a className="nav-link" href="#form">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="home">
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT: Name + tagline + socials */}
            <div className="col-lg-6">
              <h1 className="hero-title">I'm Rojina Saberi</h1>
              <p className="hero-subtitle">" Software Developer and IT Analyst "</p>

              <ul className="list-unstyled list-social d-flex gap-3">
                <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                <li>
                  <a href="https://www.linkedin.com/in/rojinasaberi/">
                    <i className="bi bi-linkedin"></i> click!
                  </a>
                </li>
              </ul>
            </div>

            {/* RIGHT: Profile picture */}
            <div className="col-lg-6 text-center">
              <img src={picture} alt="Rojina" className="hero-photo" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="aboutsection">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-center">
              <img src={picture} alt="Rojina" className="about-photo" />
            </div>
            <div className="col-lg-8">
              <p className="about-heading">
                A results-oriented IT professional, studying Information Technology.
              </p>
              <p className="about-text">
                Trained in object-oriented programming and Agile methodology. Seeking
                opportunity to provide IT and administrative support for infrastructure,
                project management, or application teams.
              </p>
              <a href="#" className="btn btn-visitpage">Resume</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
