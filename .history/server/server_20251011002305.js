import dotenv from "dotenv";
import contactRoutes from "./server/routes/contact.routes.js";
import mongoose from "mongoose";
import app from "./server/express.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Portfolio API is running ✅");
});
app.use("/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
// ⬇️ Added: mount contacts API
app.use("/api/contacts", contactRoutes);

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Portfolio";

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
    
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT} (DB failed)`);
    });
  });
