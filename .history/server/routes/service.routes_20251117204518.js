import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import { requireSignin, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC (anyone)
router.get("/", getServices);
router.get("/:id", getServiceById);

// ADMIN ONLY
router.post("/", requireSignin, requireAdmin, createService);
router.put("/:id", requireSignin, requireAdmin, updateService);
router.delete("/:id", requireSignin, requireAdmin, deleteService);

export default router;
