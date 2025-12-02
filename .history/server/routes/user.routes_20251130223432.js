// server/routes/user.routes.js

import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

/**
 * GET user by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * SAVE SERVICE REQUESTS
 * POST /api/users/:id/request-services
 */
router.post("/:id/request-services", async (req, res) => {
  try {
    const userId = req.params.id;
    const requests = req.body; // [{ serviceId, description }]

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Append service requests
    requests.forEach((r) => {
      user.requestedServices.push({
        serviceId: r.serviceId,
        description: r.description,
      });
    });

    await user.save();

    res.json({ message: "Service request saved!" });
  } catch (err) {
    console.error("Service request error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
