import React from "react";

export default function App() {
  return (
    <>
      {/* ===== Navbar ===== */}
      <header id="header" className="fixed-top">
        <nav className="navbar container">
          {/* Logo */}
          <a href="#home" className="navbar-brand d-flex align-items-center gap-2">
            <img src="src/assets/logoname.png" alt="Rojina Logo" style={{ height: 40 }} />
            <span className="brand-text"></span>
          </a>

          <ul className="nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#services">Skills</a></li>
            <li className="nav-item"><a className="nav-link" href="#Project">Portfolio</a></li>
            <li className="nav-item"><a className="nav-link" href="#form">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* ===== Hero Section ===== */}
      <section id="home" className="home">
        <div className="container h-100">
          <div className="row h-100 hero-row">
            {/* Photo Left */}
            <div className="col-lg-5 d-flex justify-content-center align-items-center">
              <img src="src/assets/picture.jpg" alt="Rojina" className="hero-photo" />
            </div>

            {/* Text Right */}
            <div className="col-lg-7 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <h1 className="hero-title"> Rojina Saberi</h1>
              <p className="hero-subtitle">Software Developer and IT Analyst</p>

              <div className="list-social d-flex gap-3 justify-content-center justify-content-lg-start">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="https://www.linkedin.com/in/rojinasaberi/"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* ABOUT Section */}
<section id="about" className="aboutsection">
  <div className="about-container">
    <h2>A results-oriented IT professional, trained in object-oriented programming and Agile methodology.</h2>
    <p>
      Seeking opportunities to provide IT and administrative support for infrastructure, 
      project management, or application teams.
    </p>
    <a href="#" className="btn-visitpage">Resume</a>
  </div>
</section>


      {/* ===== Skills Section ===== */}
      <section id="services" className="Servicesection">
        <div className="container text-center">
          <h4 className="h4-heading">Skills</h4>
          <p className="p-heading">
            Skilled in Python, C, Java, JavaScript, HTML, CSS, and database management (MySQL).
            Experienced with VS Code, SQL Developer, Eclipse, and MDM tools.
          </p>

          <div className="row g-3">
            <div className="col-md-3"><div className="text-box"><h4>Programming</h4><p>Python, C, Java, JS, HTML, CSS</p></div></div>
            <div className="col-md-3"><div className="text-box"><h4>Database</h4><p>MySQL</p></div></div>
            <div className="col-md-3"><div className="text-box"><h4>Software</h4><p>VS Code, SQL Developer, Eclipse, MDM</p></div></div>
            <div className="col-md-3"><div className="text-box"><h4>Applications</h4><p>MS Word, Excel, ServiceDesk</p></div></div>
          </div>
        </div>
      </section>

      {/* ===== Projects Section ===== */}
      <section id="Project" className="Projectsection">
        <div className="container">
          <h2 className="h2-heading text-center mb-4">Delivered Projects</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card text-center project-card">
                <div className="card-header">Web Development Project</div>
                <div className="card-body">
                  <h5 className="card-title">Online Shop for Emily's Stickers</h5>
                  <p>Created a product page using proper HTML and CSS</p>
                  <a href="https://rozhinasaberi.github.io/ITEC3020a1/" className="btn btn-visitpage">Visit Shop</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center project-card">
                <div className="card-header">IT Project Management</div>
                <div className="card-body">
                  <h5 className="card-title">Blood Bank Management System</h5>
                  <p>Requirements, Agile, UML diagrams</p>
                  <a href="/project-women-in-tech.pdf" className="btn btn-visitpage">Download PDF</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center project-card">
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

      {/* ===== Contact Section ===== */}
      <section id="form">
        <div className="container">
          <h2 className="text-center mb-4">Let’s be in touch!</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto" style={{ maxWidth: 720 }}>
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
