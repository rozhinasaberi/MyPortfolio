import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signin = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "email and password required" });

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET || "devsecret",
    { expiresIn: "7d" }
  );

  // set as cookie and return in body too (either works for testing)
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 });
  res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
};

export const signout = async (_req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
};
