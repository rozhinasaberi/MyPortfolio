import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller.js";
console.log("AUTH ROUTES LOADED!");
console.log("POST /signup ready");
console.log("POST /signin ready");

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
