// server/controllers/serviceController.js

import Service from "../models/serviceModel.js";

/**
 * GET ALL SERVICES
 * /api/services
 */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    // If empty, return an empty array (NOT an error)
    return res.json(services);
  } catch (error) {
    console.error("❌ Service load error:", error);
    return res.status(500).json({ error: "Failed to load services." });
  }
};

/**
 * CREATE A SERVICE  (optional — for admin)
 * POST /api/services
 */
export const createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    return res.status(201).json(newService);
  } catch (error) {
    console.error("❌ Service create error:", error);
    return res.status(500).json({ error: "Failed to create service." });
  }
};
