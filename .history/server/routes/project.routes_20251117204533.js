import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { requireSignin, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC
router.get("/", getProjects);
router.get("/:id", getProjectById);

// ADMIN ONLY
router.post("/", requireSignin, requireAdmin, createProject);
router.put("/:id", requireSignin, requireAdmin, updateProject);
router.delete("/:id", requireSignin, requireAdmin, deleteProject);

export default router;
