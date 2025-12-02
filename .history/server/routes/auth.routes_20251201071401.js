import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

/*** SIGNUP ***/
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request body:", req.body);

    const { name, email, password, phone } = req.body;

    // just save the password as plain string (you requested no hashing)
    const newUser = new User({
      name,
      email,
      password,
      phone,
      role: "user",
    });

    await newUser.save();

    return res.json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(400).json({ error: "Signup failed" });
  }
});

/*** SIGNIN (NO PASSWORD HASHING) ***/
router.post("/signin", async (req, res) => {
  try {
    console.log("Signin request:", req.body);

    const { email, password } = req.body;

    // ✔ find user
    const user = await User.findOne({ email });

    console.log("FOUND USER:", user);

    if (!user) {
      console.log("User NOT found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✔ PLain password check
    if (user.password !== password) {
      console.log("Password mismatch:", user.password, "!=", password);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("LOGIN SUCCESS");
    return res.json({
      message: "Login success",
      user,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
