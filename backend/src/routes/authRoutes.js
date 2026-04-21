import express from "express";
export const router = express.Router();
import { auth } from "../middlewares/authMiddleware.js";

import { login, register, getProfile } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);
