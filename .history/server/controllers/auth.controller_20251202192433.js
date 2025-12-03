// controllers/auth.controller.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// SIGNUP -----------------------------------------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if email exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    // Clean phone value: allow null if empty
    const cleanedPhone =
      phone && phone.toString().trim() !== "" ? phone : null;

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // plain text (your requirement)
      phone: cleanedPhone,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return everything frontend expects
    res.json({
      message: "User created!",
      user: newUser,
      token,
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
