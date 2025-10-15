import React from "react";

export default function App() {
  return (
    <>
      {/* ===== Navbar ===== */}
      <header id="header" className="fixed-top">
        <nav className="navbar navbar-expand-lg navbar-light container">
          <a href="#home" className="navbar-brand fw-bold">Rojina</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#Project">Portfolio</a></li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Projects
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#Project">Web Development</a></li>
                  <li><a className="dropdown-item" href="#Project">Java Development</a></li>
                  <li><a className="dropdown-item" href="#Project">Python</a></li>
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link" href="#form">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ===== Hero Section ===== */}
      <section id="home" className="home d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            {/* Left column */}
            <div className="col-lg-6 text-center text-lg-start">
              <h1>I'm Rojina Saberi</h1>
              <p>Software Developer and IT Analyst</p>

              <div className="list-social d-flex gap-3">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="https://www.linkedin.com/in/rojinasaberi/">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            {/* Right column */}
            <div className="col-lg-6">
              <img src="picture.jpg" alt="Rojina" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section id="about" className="aboutsection">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className="about-heading">
                A results-oriented IT professional, trained in object-oriented programming and Agile methodology.
              </p>
              <p className="about-text">
                Seeking opportunities to provide IT and administrative support for infrastructure, project management, or application teams.
              </p>
              <a href="/resume.pdf" className="btn btn-visitpage bi bi-cloud-arrow-up-fill">
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section id="services" className="Servicesection">
        <div className="container text-center">
          <h4 className="h4-heading">Skills</h4>
          <p className="p-heading">
            Skilled in Python, C, Java, JavaScript, HTML, CSS, and database management (MySQL).
            Experienced with VS Code, SQL Developer, Eclipse, and MDM tools.
          </p>

          <div className="row">
            <div className="col-md-3">
              <div className="text-box">
                <h4>Programming</h4>
                <p>Python, C, Java, JavaScript, HTML, CSS</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-box">
                <h4>Database</h4>
                <p>MySQL</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-box">
                <h4>Software</h4>
                <p>VS Code, SQL Developer, Eclipse, MDM</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-box">
                <h4>Applications</h4>
                <p>MS Word, Excel, ManageEngine ServiceDesk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Projects ===== */}
      <section id="Project" className="Projectsection">
        <div className="container">
          <h2 className="h2-heading text-center mb-4">Delivered Projects</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-header">Web Development Project</div>
                <div className="card-body">
                  <h5 className="card-title">Online Shop for Emily's Stickers</h5>
                  <p>Created a product page using proper HTML and CSS</p>
                  <a href="https://rozhinasaberi.github.io/ITEC3020a1/" className="btn btn-visitpage">Visit Shop</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-header">IT Project Management</div>
                <div className="card-body">
                  <h5 className="card-title">Blood Bank Management System</h5>
                  <p>Collected requirements, applied Agile, created UML diagrams</p>
                  <a href="/project-women-in-tech.pdf" className="btn btn-visitpage">Download PDF</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-header">Python Project</div>
                <div className="card-body">
                  <h5 className="card-title">McDonald's Pricing Strategies</h5>
                  <p>Clustering + classification to analyze pricing</p>
                  <a href="/it4230-report.pdf" className="btn btn-visitpage">Download File</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="form">
        <div className="container">
          <h2 className="text-center mb-4">Let’s be in touch!</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">First Name</label>
              <input type="text" className="form-control" id="fname" placeholder="Your name.." />
            </div>
            <div className="mb-3">
              <label htmlFor="lname" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lname" placeholder="Your last name.." />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <select id="country" className="form-select" defaultValue="canada">
                <option value="canada">Canada</option>
                <option value="uk">UK</option>
                <option value="usa">USA</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Message</label>
              <textarea id="subject" className="form-control" placeholder="Write something.." rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-visitpage">Send</button>
          </form>
        </div>
      </section>
    </>
  );
}
