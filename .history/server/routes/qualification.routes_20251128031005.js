import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
} from "../controllers/contact.controller.js";
import { requireSignin, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC: send message
router.post("/", createContact);

// ADMIN: read / delete
router.get("/", requireSignin, requireAdmin, getContacts);
router.get("/:id", requireSignin, requireAdmin, getContactById);
router.delete("/:id", requireSignin, requireAdmin, deleteContact);

export default router;
