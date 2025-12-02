import Service from "../models/serviceModel.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Service load error:", error);
    res.status(500).json({ error: "Failed to load services." });
  }
};
