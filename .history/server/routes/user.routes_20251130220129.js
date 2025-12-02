import express from "express";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";

const router = express.Router();


//  Get ALL users (admin use)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Get single user (profile)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Get user's purchased projects
router.get("/:id/projects", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("projectsBought");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.projectsBought || []);
  } catch (err) {
    console.error("User project fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


//  Add a project to a user (use when you "complete" or deliver project)
router.post("/:id/add-project", async (req, res) => {
  try {
    const { projectId } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.projectsBought.push(projectId);
    await user.save();

    res.json({ message: "Project added to user!", user });
  } catch (err) {
    console.error("Project add error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
