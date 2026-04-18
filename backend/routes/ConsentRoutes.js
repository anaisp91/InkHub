import {
  createConsent,
  getAllConsents,
  getConsentById,
} from "../controllers/ConsentController.js";

import express from "express";

const app = express();
export const router = express.Router();

router.post("/create", createConsent);
router.get("/", getAllConsents);
router.get("/:id", getConsentById);
