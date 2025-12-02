// server/routes/user.routes.js

import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// GET user info
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("requestedServices.serviceId");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST request services
router.post("/:id/services", async (req, res) => {
  try {
    const { requests } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    requests.forEach((reqItem) => {
      user.requestedServices.push(reqItem);
    });

    await user.save();

    res.json({ message: "Service requests saved." });
  } catch (err) {
    console.log("Service request error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

export default router;
