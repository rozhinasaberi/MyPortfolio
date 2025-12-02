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

    const newUser = new User({
      name,
      email,
      password, // plain text as you requested
      phone: cleanedPhone,
    });

    await newUser.save();

    res.json({ message: "User created!" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGIN ------------------------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
