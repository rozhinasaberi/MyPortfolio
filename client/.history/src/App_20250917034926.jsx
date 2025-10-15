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
            <li className="nav-item"><a className="nav-link" href="#about">About Me</a></li>
            <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="#Project">Projects</a></li>
            <li className="nav-item"><a className="nav-link" href="#form">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* ===== Hero Section ===== */}
      <section id="home" className="home">
        <div className="container h-100">
          <div className="row h-100 hero-row">
            {/* Photo Left */}
            <div className="container">
    <h1>Welcome to My Portfolio</h1>
    <p className="lead">
      Hi, I’m <strong>Rojina Saberi</strong>. I want to contribute my abilities to a forward thinking firm that values innovation, cooperation, and growth.
    </p>
    <p className="mission"> My mission is to leverage technology to create impactful, efficient, and meaningful digital experiences.
    
    </p>
    <a href="#about" className="btn btn-visitpage">
      Learn More About Me
    </a>
  </div>
          </div>
        </div>
      </section>
      <section id="home" className="home-section text-center">
  
</section>

{/* ABOUT Section */}
<section id="about" className="aboutsection about-stack">
  <div className="container">
    <div className="about-stack-inner">
      {/* Photo TOP */}
      <img src="src/assets/picture.jpg" alt="Rojina" className="hero-photo" />
      
      {/* Name */}
      <h1 className="hero-title">Rojina Saberi</h1>

      {/* Short subtitle */}
      <p className="hero-subtitle">Software Developer and IT Analyst</p>

      {/* Socials */}
      <div className="list-social">c
        <a href="#"><i className="bi bi-facebook"></i></a>
        <a href="#"><i className="bi bi-twitter"></i></a>
        <a href="https://www.linkedin.com/in/rojinasaberi/"><i className="bi bi-linkedin"></i></a>
      </div>
    </div>

    {/* About container below profile */}
    <div className="about-container">
      <h2>
      Detail-oriented and solution-driven IT expert with a solid background in technical support, system administration, and enterprise
technologies, as well as hands-on experience resolving user issues in fast-paced work environments. With a degree in information
technology from York University and hands-on expertise gained through a high-impact internship at Green Infrastructure
Partners, I provide a unique combination of academic knowledge and practical experience. I am an expert in Microsoft 365,
Active Directory, Intune, and network support, and I specialize at translating technical issues into clear, effective solutions for
customers. I am known for my flexibility, communication skills, and enthusiasm for continuous development, and I am dedicated
to improving operational efficiency and providing safe, efficient IT infrastructure.
      </h2>
      <p>
        Seeking opportunities to provide IT and administrative support for infrastructure, 
        project management, or application teams.
      </p>
      <a href="src/assets/Rojina-Saberi.pdf (1).pdf" className="btn-visitpage">Resume</a>
    </div>
  </div>
</section>



      {/* ===== Skills Section ===== */}
      <section id="services" className="Servicesection">
        <div className="container text-center">
          <h4 className="h4-heading">Services</h4>
          <p className="p-heading">
            Skilled in Python, C, Java, JavaScript, HTML, CSS, and database management (MySQL).
            Experienced with VS Code, SQL Developer, Eclipse, and MDM tools.
          </p>

          <div className="row g-3">
            <div className="col-md-3"><div className="text-box"><h4>Technical Support & Helpdesk</h4><p>Friendly, fast resolution for laptops, apps, accounts, and onboarding.</p>
          <ul>
            <li>Ticket triage & remote assistance</li>
            <li>User onboarding & knowledge sharing</li>
          </ul></div></div>
            <div className="col-md-3"><div className="text-box"><h4>Systems & Administration</h4> <p>Keep org systems healthy and compliant across users and devices.</p>
          <ul>
            <li>Active Directory, M365, Intune</li>
            <li>Asset & mobile device management</li>
          </ul></div></div>
            <div className="col-md-3"><div className="text-box"><h4>Networking & Security</h4><p>Stable connectivity with strong identity, access, and endpoint protection.</p>
          <ul>
            <li>LAN/WAN, VLANs, VPN, Cisco switches</li>
            <li>MFA, DLP, endpoint protection</li>
          </ul></div></div>
            <div className="col-md-3"><div className="text-box"><h4>Data & Cloud </h4><p>Backups, BI, and cloud services to keep your data useful and safe.</p>
          <ul>
            <li>Azure/AWS/GCP basics, VMware</li>
            <li>Backups, security, and BI dashboards</li>
          </ul></div></div>
          <div className="col-md-3"><div className="text-box"><h4>Software Development</h4><p>From scripts to web apps with clean APIs and secure data access.</p>
          <ul>
            <li>Python, Java, JavaScript (React/Node)</li>
            <li>MySQL/Oracle/MongoDB, REST APIs</li>
          </ul></div></div>
          <div className="col-md-3"><div className="text-box"><h4>Networking & Security</h4><p>Stable connectivity with strong identity, access, and endpoint protection.</p>
          <ul>
            <li>LAN/WAN, VLANs, VPN, Cisco switches</li>
            <li>MFA, DLP, endpoint protection</li>
          </ul></div></div>
          <div className="col-md-3"><div className="text-box"><h4>Documentation & Process</h4><p>Clear docs and Agile habits so teams move quickly and consistently.</p>
          <ul>
            <li>Runbooks, SOPs, A/B fixes & retros</li>
            <li>JIRA, ServiceNow, Notion, MS Project</li>
          </ul></div></div>
         
          </div>
        </div>
      </section>

      {/* ===== Projects Section ===== */}
      <section id="projects" className="Projectsection">
  <div className="container">
    <h2 className="h2-heading">Delivered Projects</h2>
    <p className="p-heading">Here are some of the projects I’ve worked on, with my role and the outcomes.</p>

    <div className="row g-4">
      {/* Project 1 */}
      <div className="col-lg-4 col-md-6">
        <div className="card project-card">
          <img src="./assets/project1.png" className="card-img-top" alt="Sticker Shop" />
          <div className="card-body">
            <h5 className="card-title">Online Shop for Emily's Stickers</h5>
            <p className="card-text">
              <strong>My Role:</strong> Designed and coded the frontend using HTML/CSS.  
              <br />
              <strong>Outcome:</strong> Delivered a fully functional static site for product browsing.
            </p>
            <a href="https://rozhinasaberi.github.io/ITEC3020a1/" className="btn btn-visitpage">Visit Shop</a>
          </div>
        </div>
      </div>

      {/* Project 2 */}
      <div className="col-lg-4 col-md-6">
        <div className="card project-card">
          <img src="./assets/project2.png" className="card-img-top" alt="Blood Bank" />
          <div className="card-body">
            <h5 className="card-title">Blood Bank Management System</h5>
            <p className="card-text">
              <strong>My Role:</strong> Gathered requirements, created UML diagrams, and managed Agile sprints.  
              <br />
              <strong>Outcome:</strong> Produced system documentation and functional specifications.
            </p>
            <a href="src/assets/Project_07_Full Plan_WomenInTech.docx.pdf" className="btn btn-visitpage">Download Project</a>
          </div>
        </div>
      </div>

      {/* Project 3 */}
      <div className="col-lg-4 col-md-6">
        <div className="card project-card">
          <img src="./assets/project3.png" className="card-img-top" alt="McDonald's Data Analysis" />
          <div className="card-body">
            <h5 className="card-title">Consumer Preferences & Pricing Strategies</h5>
            <p className="card-text">
              <strong>My Role:</strong> Data cleaning, clustering, and Python UI design.  
              <br />
              <strong>Outcome:</strong> Delivered insights on pricing strategies using classification models.
            </p>
            <a href="src/assets/ITEC 4230 Report.pdf" className="btn btn-visitpage">Download Report</a>
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
