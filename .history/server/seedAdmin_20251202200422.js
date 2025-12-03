// server/seedAdmin.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/user.model.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Portfolio";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const email = "admin@portfolio.com";
    const password = "Admin123!"; 

    let admin = await User.findOne({ email });

    if (!admin) {
      const hashed = await bcrypt.hash(password, 10);
      admin = await User.create({
        name: "Portfolio Admin",
        email,
        password: hashed,
        role: "admin",
      });
      console.log("Admin user created:", admin.email);
    } else {
      // ensure role is admin
      if (admin.role !== "admin") {
        admin.role = "admin";
        await admin.save();
        console.log("Existing user updated to admin:", admin.email);
      } else {
        console.log("Admin already exists:", admin.email);
      }
    }

    console.log("Done ");
    process.exit(0);
  } catch (err) {
    console.error("Seed admin error:", err);
    process.exit(1);
  }
}

seedAdmin();
