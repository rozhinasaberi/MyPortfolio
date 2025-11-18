import { Router } from "express";
import {
  getAll,
  getById,
  createOne,
  updateById,
  removeById,
  removeAll,
} from "../controllers/contact.controller.js";

const router = Router();

router.get("/", getAll);            // GET    /api/contacts
router.get("/:id", getById);        // GET    /api/contacts/:id
router.post("/", createOne);        // POST   /api/contacts
router.put("/:id", updateById);     // PUT    /api/contacts/:id
router.delete("/:id", removeById);  // DELETE /api/contacts/:id
router.delete("/", removeAll);      // DELETE /api/contacts

export default router;
