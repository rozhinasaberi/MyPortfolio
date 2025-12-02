// server/server.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./express.js";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

console.log("SERVER STARTING...");

// BASE TEST ROUTE
app.get("/", (_req, res) => {
  res.send("Portfolio API is running");
});

// REGISTER ROUTES
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/contacts", contactRoutes);

// PORT + MONGO
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Portfolio";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running → http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Mongo error:", err.message);
    app.listen(PORT, () =>
      console.log(`Server started without DB → http://localhost:${PORT}`)
    );
  });
