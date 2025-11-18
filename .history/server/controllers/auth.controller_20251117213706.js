import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ⭐ SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created",
      user,
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

    const user = await User.findOne({ email });

    if (!user) {
      console.log("NO SUCH USER");
      return res.status(400).json({ error: "User not found" });
    }

    console.log("HASH STORED IN DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH RESULT:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secret123",
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
