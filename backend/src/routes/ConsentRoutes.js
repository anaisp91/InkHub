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

router.post("/create", createConsent); //FUNCIONA
router.get("/", getAllConsents); //FUNCIONA
router.get("/:id", getConsentById); //FUNCIONA
router.put("/:id", updateConsent); //FUNCIONA
router.delete("/:id", deleteConsent); //FUNCIONA
