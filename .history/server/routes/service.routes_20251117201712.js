// server/routes/service.routes.js

import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller.js"; // ✅ IMPORTANT: .controller.js

const router = express.Router();

// Base path is /api/services (set in server.js)

router.post("/", createService);      // POST   /api/services
router.get("/", getServices);         // GET    /api/services
router.get("/:id", getServiceById);   // GET    /api/services/:id
router.put("/:id", updateService);    // PUT    /api/services/:id
router.delete("/:id", deleteService); // DELETE /api/services/:id

export default router;
