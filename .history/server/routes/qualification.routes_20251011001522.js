import { Router } from "express";
import { getAll, getById, createOne, updateById, removeById, removeAll } from "../controllers/qualification.controller.js";
import { requireSignin } from "../middleware/auth.js";

const router = Router();
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", requireSignin, createOne);
router.put("/:id", requireSignin, updateById);
router.delete("/:id", requireSignin, removeById);
router.delete("/", requireSignin, removeAll);

export default router;
