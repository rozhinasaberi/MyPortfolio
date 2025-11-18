MyPortfolio – Full-Stack Portfolio

A modern, full-stack portfolio showcasing my skills, projects, and experience in software engineering, web development, database management, and UI design.
The application includes both a React frontend and an Express/MongoDB backend, complete with authentication, admin roles, and dynamic CRUD-driven content.

🚀 Tech Stack
Frontend
-------
React + Vite
JavaScript (ES6+)
HTML5 / CSS3
TailwindCSS / Bootstrap
Fetch API for backend integration

Backend
--------
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
bcryptjs (Password hashing)
RESTful API Architecture

Tools
---------
Git & GitHub
Postman
VS Code
npm / Yarn

📁 Project Structure
MyPortfolio/
│
├── client/                     # React Frontend
│   ├── src/                    # Components, Pages, Hooks
│   ├── public/                 # Static Files
│   └── vite.config.js
│
└── server/                     # Express Backend
    ├── models/                 # Mongoose Schemas
    ├── routes/                 # API Routes (auth, projects, qualifications, etc.)
    ├── controllers/            # CRUD Logic
    ├── middleware/             # Auth + Admin Role Checks
    ├── seedAdmin.js            # Hardcoded Admin Seeder Script
    └── server.js               # Server Entry Point

✨ Key Features
🖥 Frontend
------------
Fully responsive UI
Navigation sections: Home, About Me, Projects, Skills, Contact
Dynamic forms:
SignUp
SignIn
Add Project
Add Qualification/Education
Contact Form
State management using React Hooks
API integration with backend using fetch() and JWT

🔐 Authentication + Authorization
----------
JWT-based authentication

Password hashing with bcryptjs

User roles:

User: Read-only

Admin: Full CRUD access

Protected routes using:

requireSignin (JWT validation)

requireAdmin (role validation)

Admin credentials are hardcoded via:

npm run seed:admin

🧩 Backend REST API
----------------
Full CRUD operations for:

Projects

Qualifications / Education

Services

Contacts

Users (Admin only)

Backend endpoints include:

POST    /auth/signup
POST    /auth/signin
GET     /api/projects
POST    /api/projects          (Admin)
PUT     /api/projects/:id      (Admin)
DELETE  /api/projects/:id      (Admin)


…and similar endpoints for contacts, services, and qualifications.

▶️ Running the Project
1️⃣ Clone the Repo (SSH)
git clone git@github.com:rozhinasaberi/MyPortfolio.git
cd MyPortfolio

2️⃣ Install + Start Backend
cd server
npm install
npm run server


Runs at:

http://localhost:3000

3️⃣ Create Admin Account
npm run seed:admin

4️⃣ Install + Start Frontend
cd ../client
npm install
npm run dev


Runs at:

http://localhost:5173

📬 Contact API

The contact form on the frontend submits directly to:

POST /api/contacts


All contact messages are stored in MongoDB and visible to admin through a protected route.

🧠 Future Enhancements

Admin dashboard UI

Email notifications (Nodemailer)

Dark mode toggle

Analytics for portfolio visits

👩‍💻 Author

Rojina Saberi
Software Developer & UI Designer
📧 Email: rozhinasaberi@yahoo.com

💻 GitHub: @rozhinasaberi
