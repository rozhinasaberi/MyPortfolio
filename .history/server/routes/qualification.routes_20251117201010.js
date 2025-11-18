// server/routes/qualificationRoutes.js

import express from "express";
import {
  createQualification,
  getQualifications,
  getQualificationById,
  updateQualification,
  deleteQualification,
} from "../controllers/qualification.controller.js";

const router = express.Router();

// Base path in server.js will be: /api/qualifications

// CREATE  - POST /api/qualifications
router.post("/", createQualification);

// READ ALL  - GET /api/qualifications
router.get("/", getQualifications);

// READ ONE  - GET /api/qualifications/:id
router.get("/:id", getQualificationById);

// UPDATE  - PUT /api/qualifications/:id
router.put("/:id", updateQualification);

// DELETE  - DELETE /api/qualifications/:id
router.delete("/:id", deleteQualification);

export default router;
