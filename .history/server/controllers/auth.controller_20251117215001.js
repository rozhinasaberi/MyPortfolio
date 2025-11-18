import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// ⭐ SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password here (since model does not do it for now)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// ⭐ SIGNIN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("==== LOGIN ATTEMPT ====");
    console.log("EMAIL FROM CLIENT:", email);
    console.log("PASSWORD FROM CLIENT:", password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log("NO SUCH USER");
      return res.status(400).json({ error: "User not found" });
    }

    const plainPassword = String(password);
    const hashedPassword = plainPassword; 

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

    console.log("PASSWORD MATCH RESULT:", isMatch);
    

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("SIGNIN ERROR:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};
