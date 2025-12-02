import express from "express";
import User from "..service.model.js";


const router = express.Router();

// =====================================
// SIGNUP
// =====================================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // prevent duplicates
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const newUser = new User({
      name,
      email,
      password, // NO HASHING as requested
      phone,
    });

    await newUser.save();

    res.json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
      token: "dummy-token", // You already use a simple token system
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed." });
  }
});

// =====================================
// SIGNIN
// =====================================
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password }); // NO HASHING

    if (!user) {
      return res.status(400).json({ error: "Invalid login credentials." });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token: "dummy-token",
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

export default router;
