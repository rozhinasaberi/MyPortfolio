// server/routes/auth.routes.js
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const router = express.Router();

/*** SIGNUP ***/
router.post("/signup", async (req, res) => {
  console.log("Signup request body:", req.body);
  const { name, email, password, phone } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already in use" });

    const user = await User.create({
      name,
      email,
      password,  // store raw password
      phone,
      role: "user"
    });

    res.json({ message: "Signup successful", user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: "Signup failed" });
  }
});

/*** SIGNIN ***/
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
