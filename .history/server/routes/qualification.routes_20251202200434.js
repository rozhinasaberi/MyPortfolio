import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
} from "../controllers/contact.controller.js";
import { requireSignin, requireAdmin } from "../middleware/auth.js";

const router = express.Router();


router.post("/", createContact);

router.get("/", requireSignin, requireAdmin, getContacts);
router.get("/:id", requireSignin, requireAdmin, getContactById);
router.delete("/:id", requireSignin, requireAdmin, deleteContact);

export default router;
