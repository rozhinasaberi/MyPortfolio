import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// ----------------------
// Save requested services
// ----------------------
router.post("/:id/request-services", async (req, res) => {
  try {
    const userId = req.params.id;
    const requests = req.body; // array of { serviceId, description }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    requests.forEach((r) => {
      user.requestedServices.push({
        serviceId: r.serviceId,
        description: r.description || "",
        status: "pending",
        date: new Date(),
      });
    });

    await user.save();

    res.json({ message: "Service requests saved." });
  } catch (err) {
    console.error("Service request error", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
