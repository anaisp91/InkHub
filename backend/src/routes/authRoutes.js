import express from "express";
export const router = express.Router();

import { register } from "../controllers/authController.js";

router.post("/register", register);
