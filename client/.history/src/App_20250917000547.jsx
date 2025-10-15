import React from "react";

export default function App() {
  return (
    <>
      {/* ===== Header / Navbar ===== */}
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center justify-content-between">

          <a href="#home" className="logo">
            <img src="/logo.png" alt="Rojina" className="img-fluid" />
          </a>

          <nav id="navbar" className="navbar navbar-expand-lg">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
              aria-controls="navMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div id="navMenu" className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Projects</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-submenu">
                      <a className="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Programming</a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#Project">Web development</a></li>
                        <li><a className="dropdown-item" href="#Project">Java development</a></li>
                        <li><a className="dropdown-item" href="#Project">Python</a></li>
                      </ul>
                    </li>
                    <li><a className="dropdown-item" href="#Project">Project Management</a></li>
                    <li><a className="dropdown-item" href="#Project">Data Analysis</a></li>
                  </ul>
                </li>

                <li className="nav-item"><a className="nav-link" href="#form">Contact</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* ===== Home ===== */}
      <div id="home" className="home">
        <div className="container">
          <div className="home-content">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1>I'm Rojina Saberi</h1>
                <p>" Software Developer and IT Analyst"</p>

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

              <div className="col-lg-6">
                <div className="experiences">
                  <div className="time">Sept2020 - Oct2024</div>
                  <h6>B.A., Hons. Information Technology</h6>
                  <p>York University | Toronto, ON</p>

                  <a className="btn btn-light btn-sm" data-bs-toggle="collapse" href="#school" role="button" aria-expanded="false" aria-controls="school">
                    What I did at YorkU!
                  </a>

                  <div className="collapse" id="school">
                    <div className="card card-body">
                      <p>
                        Academic projects like "Consumer Preferences and Pricing Strategies in McDonald's" and "Blood Bank Management System"
                        gave me the ability to successfully gather, assess, and use data. Git/GitHub expertise, plus my proficiency with web frameworks
                        and API development, help me thrive in Agile/Scrum teams.
                      </p>
                    </div>
                  </div>

                  <div className="time">Sept2020 - PRESENT</div>
                  <h6>Freelance Web Developer</h6>
                  <p>Working happily on my own web projects</p>

                  <div className="time">Jan2023 - Aug2023</div>
                  <h6>IT Co-op</h6>
                  <p>Green Infrastructure Partners Inc.</p>

                  <a className="btn btn-light btn-sm" data-bs-toggle="collapse" href="#GIP" role="button" aria-expanded="false" aria-controls="GIP">
                    Learn more about what I have done at GIP
                  </a>

                  <div className="collapse" id="GIP">
                    <div className="card card-body">
                      <p>
                        I managed and maintained Active Directory services while at GIP, ensuring secure authentication and access control. This role highlighted the importance of careful detail and strong system administration practices.
                      </p>
                      <p>
                        My internship also exposed me to separating business requirements from user needs and translating them into precise technical solutions — a foundation for software development and product delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ===== About ===== */}
      <main id="main">
        <div id="about" className="aboutsection">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-4">
                <div className="about-img">
                  <img src="/aboutme.jpg" className="img-responsive" alt="me" />
                </div>
              </div>

              <div className="col-lg-8">
                <div className="about-description">
                  <p className="about-heading">
                    A results-oriented IT professional, trained in object-oriented programming and Agile methodology.
                  </p>
                  <p className="about-text">
                    Seeking opportunities to provide IT and administrative support for infrastructure, project management, or application teams.
                  </p>
                  <a href="/resume.pdf" className="btn btn-visitpage bi bi-cloud-arrow-up-fill"> Resume</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Services ===== */}
        <div id="services" className="Servicesection">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="h4-heading">Skills</h4>
                <p className="p-heading">
                  Skilled in Python, C, Java, JavaScript, HTML, CSS, and database management (MySQL). Experienced with VS Code, SQL Developer, Eclipse, and MDM tools.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div className="text-box">
                  <h4>Programming Languages</h4>
                  <p>Python, C, Java, JavaScript, HTML, CSS</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="text-box">
                  <h4>Database</h4>
                  <p>MySQL</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="text-box">
                  <h4>Software</h4>
                  <p>VS Code, SQL Developer, Eclipse, MDM</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="text-box">
                  <h4>Applications</h4>
                  <p>MS Word, Excel, ManageEngine ServiceDesk</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Projects ===== */}
        <div id="Project" className="Projectsection">
          <div className="container">
            <div className="row">

              <div className="col-lg-12">
                <h2 className="h2-heading">Delivered projects</h2>
                <p className="p-heading">Some of my representative projects:</p>
              </div>

              {/* Project 1 */}
              <div className="col-lg-4">
                <div className="card text-center">
                  <div className="card-header">Web Development Project</div>
                  <div className="card-body">
                    <h5 className="card-title">Online Shop for Emily's Stickers</h5>
                    <p className="card-text">Made a static website for a sticker shop.</p>
                    <p>Created a product page using proper HTML and CSS.</p>
                    <a href="https://rozhinasaberi.github.io/ITEC3020a1/" className="btn btn-visitpage">Visit Shop</a>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="col-lg-4">
                <div className="card text-center">
                  <div className="card-header">IT Project Management</div>
                  <div className="card-body">
                    <h5 className="card-title">Blood Bank Management System</h5>
                    <p className="card-text">Collected requirements, applied Agile, wrote user stories, and created UML diagrams.</p>
                    <p>Documented functional and non-functional requirements.</p>
                    <a href="/project-women-in-tech.pdf" className="btn btn-visitpage">Download Project PDF</a>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="col-lg-4">
                <div className="card text-center">
                  <div className="card-header">Python Project</div>
                  <div className="card-body">
                    <h5 className="card-title">McDonald's Pricing Strategies</h5>
                    <p className="card-text">
                      Applied clustering and classification to investigate pricing factors.
                    </p>
                    <p>
                      Extracted and cleaned data from multiple resources, transforming it into usable formats.
                    </p>
                    <p>
                      Developed and programmed a simple front-end interface using Python.
                    </p>
                    <a href="/it4230-report.pdf" className="btn btn-visitpage">Download Project File</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===== Contact ===== */}
        <div id="form" className="container">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-lg-12">
                <h2>Let's be in touch!</h2>
                <p className="p-heading">
                  For any type of questions, please don't hesitate to contact me.
                  The fastest way is to send me your message using this email:{" "}
                  <a href="mailto:rozhinasaberi@yahoo.com">rozhinasaberi@yahoo.com</a>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="subject-form">
                <label htmlFor="fname">First Name</label>
              </div>
              <div className="item-form">
                <input type="text" id="fname" name="firstname" placeholder="Your name.." />
              </div>
            </div>

            <div className="row">
              <div className="subject-form">
                <label htmlFor="lname">Last Name</label>
              </div>
              <div className="item-form">
                <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
              </div>
            </div>

            <div className="row">
              <div className="subject-form">
                <label htmlFor="country">Country</label>
              </div>
              <div className="item-form">
                <select id="country" name="country" defaultValue="canada">
                  <option value="canada">Canada</option>
                  <option value="uk">UK</option>
                  <option value="usa">USA</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="subject-form">
                <label htmlFor="subject">Subject</label>
              </div>
              <div className="item-form">
                <textarea id="subject" name="subject" placeholder="Write something.." style={{ height: 200 }}></textarea>
              </div>
            </div>

            <br />
            <div className="row">
              <input type="submit" className="btn btn-light" value="Send" />
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
