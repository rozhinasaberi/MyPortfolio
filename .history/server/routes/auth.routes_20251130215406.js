import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request body:", req.body);

    const { name, email, password, phone } = req.body;

    if (!email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = await User.create({
      name: name || "",
      email,
      password,
      phone: phone || "",
    });

    console.log("New user created:", newUser);

    return res.json({ message: "Signup ok", user: newUser });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Signup failed." });
  }
});

// LOGIN
router.post("/signin", async (req, res) => {
  try {
    console.log("Signin request:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (user.password !== password) {
      console.log("Incorrect password");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    return res.json({ message: "Login ok", user });

  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ error: "Login failed." });
  }
});

export default router;
