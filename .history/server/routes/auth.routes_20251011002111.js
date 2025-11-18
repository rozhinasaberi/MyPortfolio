import { Router } from "express";
import { signin, signout } from "../controllers/auth.controller.js";

const router = Router();
router.post("/signin", signin);
router.post("/signout", signout);

export default router;
