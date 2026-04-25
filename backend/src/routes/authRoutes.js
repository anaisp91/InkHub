import express from "express";
export const router = express.Router();
import { auth, roleMidd } from "../middlewares/authMiddleware.js";

import {
  registerStudio,
  registerArtist,
  login,
} from "../controllers/authController.js";

router.post("/register/studio", registerStudio);
router.post("/register/artist", auth, roleMidd(["studio"]), registerArtist);
router.post("/login", login);
// router.get("/profile", auth, getProfile);
