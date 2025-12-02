// server/routes/user.routes.js
import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

/*** GET USER BY ID ***/
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/*** SUBMIT SERVICE REQUEST(S) ***/
router.post("/:id/request-services", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    req.body.forEach((r) => {
      user.requestedServices.push({
        serviceId: r.serviceId,
        description: r.description,
      });
    });

    await user.save();

    res.json({ message: "Service requests saved!" });
  } catch (err) {
    console.error("Service request error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/*** REQUEST HISTORY (POPULATED) ***/
router.get("/:id/requests", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "requestedServices.serviceId"
    );
    res.json(user.requestedServices);
  } catch (err) {
    res.status(500).json({ error: "Failed to load requests" });
  }
});
/*** UPDATE A REQUEST ***/
router.put("/:userId/requests/:requestId", async (req, res) => {
  try {
    const { userId, requestId } = req.params;
    const { description, stage } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const reqObj = user.requestedServices.id(requestId);
    if (!reqObj) return res.status(404).json({ error: "Request not found" });

    if (description !== undefined) reqObj.description = description;
    if (stage !== undefined) reqObj.stage = stage;

    await user.save();

    res.json({ message: "Request updated", updatedRequest: reqObj });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
