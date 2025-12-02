import Service from "../models/service.model.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Service load error:", error);
    res.status(500).json({ error: "Failed to load services." });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("Service create error:", error);
    res.status(500).json({ error: "Failed to create service." });
  }
};
