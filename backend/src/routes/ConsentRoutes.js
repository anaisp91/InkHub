//@ts-check
import {
  createConsent,
  deleteConsent,
  getAllConsents,
  getConsentById,
  updateConsent,
} from "../controllers/ConsentController.js";

import express from "express";

const app = express();
export const router = express.Router();

router.post("/create", createConsent);
router.get("/", getAllConsents);
router.get("/:id", getConsentById);
router.put("/:id", updateConsent);
router.delete("/:id", deleteConsent);
