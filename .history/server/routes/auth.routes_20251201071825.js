import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

/* ======================
    SIGNUP
====================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // create user exactly as given
    const user = new User({
      name,
      email,
      password,
      phone,
      role: "user",
    });

    await user.save();

    return res.json({
      message: "Signup successful",
      user,
    });

  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ error: "Signup failed." });
  }
});


/* ======================
    SIGNIN
====================== */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("SIGNIN BODY:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" });
    }

    // find user by exact email
    const user = await User.findOne({ email });

    if (!user) {
      console.log("NO USER FOUND WITH EMAIL:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // no hashing — compare raw text
    if (user.password !== password) {
      console.log(
        "PASSWORD MISMATCH\nEntered:", password,
        "\nStored:", user.password
      );
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("LOGIN SUCCESS:", user.email);

    return res.json({
      message: "Signin successful",
      user,
    });

  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
