import express from "express";
import { getServices, createService } from "../controllers/service.controller.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", createService); // optional

export default router;
