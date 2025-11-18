
import Qualification from "../models/qualification.model.js";


export const createQualification = async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body);
    res.status(201).json(qualification);
  } catch (error) {
    console.error("Error creating qualification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// READ ALL  
export const getQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ createdAt: -1 });
    res.json(qualifications);
  } catch (error) {
    console.error("Error getting qualifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// READ ONE 
export const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ message: "Qualification not found" });
    }
    res.json(qualification);
  } catch (error) {
    console.error("Error getting qualification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 
export const updateQualification = async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Qualification not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating qualification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE 
export const deleteQualification = async (req, res) => {
  try {
    const deleted = await Qualification.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Qualification not found" });
    }

    res.json({ message: "Qualification deleted successfully" });
  } catch (error) {
    console.error("Error deleting qualification:", error);
    res.status(500).json({ message: "Server error" });
  }
};
