import { Router } from "express";
import { getAll, getById, createOne, updateById, removeById, removeAll } from "../controllers/project.controller.js";
import { requireSignin } from "../middleware/auth.js";

const router = Router();

// Example: protect create/update/delete, leave reads open (adjust as needed)
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", requireSignin, createOne);
router.put("/:id", requireSignin, updateById);
router.delete("/:id", requireSignin, removeById);
router.delete("/", requireSignin, removeAll);

export default router;
