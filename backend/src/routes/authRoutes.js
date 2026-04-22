import express from "express";
export const router = express.Router();
import { auth } from "../middlewares/authMiddleware.js";

import {
  registerStudio,
  registerArtist,
} from "../controllers/authController.js";

router.post("/registerStudio", registerStudio);
router.post("/registerArtist", registerArtist);
// router.post("/login", login);
// router.get("/profile", auth, getProfile);
