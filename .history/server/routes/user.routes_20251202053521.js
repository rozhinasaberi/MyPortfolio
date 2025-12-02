import express from "express";
import {
  getUser,
  submitRequest,
  getRequests,
  updateRequest,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/:id/request-services", submitRequest);
router.get("/:id/requests", getRequests);
router.put("/:userId/requests/:requestId", updateRequest);

export default router;
