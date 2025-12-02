import { Router } from "express";
import { getAll, getById, createOne, updateById, removeById, removeAll } from "../controllers/user.controller.js";
import { requireSignin } from "../middleware/auth.js";

const router = Router();
// Often user creation is public (signup). Keep open or protect per rubric.
router.get("/", requireSignin, getAll);
router.get("/:id", requireSignin, getById);
router.post("/", createOne); // signup
router.put("/:id", requireSignin, updateById);
router.delete("/:id", requireSignin, removeById);
router.delete("/", requireSignin, removeAll);

export default router;
