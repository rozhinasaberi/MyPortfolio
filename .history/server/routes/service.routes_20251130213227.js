import express from "express";
import Service from "../models/service.model.js";

const router = express.Router();

// ================================================
// GET ALL SERVICES
// ================================================
router.get("/", async (_req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to load services." });
  }
});

// ================================================
// GET SERVICES FOR SPECIFIC USER
// ================================================
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const services = await Service.find({ customerId: id })
      .sort({ date: -1 })
      .lean();

    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's service history." });
  }
});

// ================================================
// GET ONE SERVICE BY ID
// ================================================
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to load service." });
  }
});

// ================================================
// CREATE NEW SERVICE
// ================================================
router.post("/", async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      date,
      imageUrl,
      customerId,
      customerEmail,
    } = req.body;

    const newService = new Service({
      title,
      shortDescription,
      description,
      imageUrl,
      date,
      customerId: customerId || null,
      customerEmail: customerEmail || null,
    });

    await newService.save();
    res.json(newService);
  } catch (err) {
    res.status(500).json({ error: "Failed to create service." });
  }
});

// ================================================
// UPDATE SERVICE
// ================================================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update service." });
  }
});

// ================================================
// DELETE SERVICE
// ================================================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete service." });
  }
});

export default router;
