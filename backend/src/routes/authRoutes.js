import express from "express";
export const router = express.Router();
import { auth, verifyRole } from "../middlewares/authMiddleware.js";

import { registerStudio } from "../controllers/authController.js";

router.post("/registerStudio", registerStudio);
//router.post("/registerArtist", auth, verifyRole, registerArtist);
// router.post("/login", login);
// router.get("/profile", auth, getProfile);
