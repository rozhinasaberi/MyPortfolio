// server/server.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./express.js";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

console.log("SERVER STARTING...");

//  API BASE ROUTE
app.get("/", (_req, res) => {
  res.send("Portfolio API is running");
});

//  REGISTER ROUTES
app.use("/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

//  PORT + MONGO
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Portfolio";

// CONNECT TO MONGO & START SERVER
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("xxxxx MongoDB connection error:", err.message);

    // Still start server even if DB fails
    app.listen(PORT, () => {
      console.log(
        `Server listening on http://localhost:${PORT} (DB failed to connect)`
      );
    });
  });
