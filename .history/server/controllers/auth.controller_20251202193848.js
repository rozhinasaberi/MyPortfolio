import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// SIGNUP -----------------------------------------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 1. Check if email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // 2. Clean phone value
    const cleanedPhone =
      phone && phone.toString().trim() !== "" ? phone : null;

    // 3. Create user
    const newUser = new User({
      name,
      email,
      password, // plain text as you requested
      phone: cleanedPhone,
      role: "user", // ensures role is always set
    });

    // Save in DB
    const savedUser = await newUser.save();

    // 4. Create JWT token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Return full user + token like login does
    res.json({
      message: "Signup successful!",
      user: savedUser,
      token,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
