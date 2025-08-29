import express from "express";
import { signUp, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginUser);

export default router;
