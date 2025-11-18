// server/server.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./express.js";

// ROUTES (ONLY the ones that actually exist in /routes)
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import userRoutes from "./routes/user.routes.js";

console.log("SERVER STARTING...");

dotenv.config();

// BASE CHECK ROUTE
app.get("/", (_req, res) => {
  res.send("Portfolio API is running ✅");
});

// API ROUTES
app.use("/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Portfolio";

// DATABASE + SERVER STARTUP
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);

    // Still allow server to run even if DB fails
    app.listen(PORT, () => {
      console.log(
        `🚀 Server listening on http://localhost:${PORT} (DB failed to connect)`
      );
    });
  });
