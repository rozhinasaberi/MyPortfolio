// server/controllers/user.controller.js

import User from "../models/user.model.js";

// GET /api/users
export const getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // never send passwords
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Error getting users" });
  }
};

// GET /api/users/:id
export const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Error getting user" });
  }
};

// POST /api/users
export const createOne = async (req, res) => {
  try {
    // This is more for admin-created users; signup still uses /auth/signup
    const user = new User(req.body);
    await user.save();
    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json(safeUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
};

// PUT
export const updateById = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Error updating user", error: error.message });
  }
};

// DELETE
export const removeById = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// DELETe
export const removeAll = async (_req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).json({ message: "Error deleting all users" });
  }
};
