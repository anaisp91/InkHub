import express from "express";
export const router = express.Router();
import { auth } from "../middlewares/authMiddleware.js";

import { registerStudio } from "../controllers/authController.js";

router.post("/register", registerStudio);
// router.post("/login", login);
// router.get("/profile", auth, getProfile);
