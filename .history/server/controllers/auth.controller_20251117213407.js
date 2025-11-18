import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// ⭐ SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // optional basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ❌ DON'T HASH HERE ANYMORE
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password, // plain for now; model will hash in pre('save')
    });

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ⭐ SIGNIN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("==== LOGIN ATTEMPT ====");
    console.log("EMAIL FROM CLIENT:", email);
    console.log("PASSWORD FROM CLIENT:", password);

    // include password field if you used select: false
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      console.log("NO SUCH USER");
      return res.status(400).json({ error: "User not found" });
    }

    console.log("HASH STORED IN DB:", user.password);

    // use schema helper
    const isMatch = await user.matchPassword(password);
    console.log("PASSWORD MATCH RESULT:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
