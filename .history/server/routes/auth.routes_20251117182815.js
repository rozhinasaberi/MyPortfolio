import { Router } from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";

const router = Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/signin", signin);

// Signout
router.post("/signout", signout);

export default router;
