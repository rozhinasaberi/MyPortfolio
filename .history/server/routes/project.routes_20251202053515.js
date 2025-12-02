import express from "express";
import { getProjects, createProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject); // optional

export default router;
