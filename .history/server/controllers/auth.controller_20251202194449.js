import User from "../models/user.model.js";

// =============================
// SIGNUP  (plain text password)
// =============================
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,   // plain text
      phone: phone || null,
      role: "user",
    });

    return res.json({
      message: "Signup successful",
      user,
    });

  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// =============================
// SIGNIN  (plain text compare)
// =============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (user.password !== password) {
      console.log("Password mismatch for:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    return res.json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
