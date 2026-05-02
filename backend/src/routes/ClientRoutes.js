//@ts-check
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  getConsentByClient,
  updateClient,
} from "../controllers/ClientController.js";

import express from "express";

const app = express();
export const router = express.Router();

router.post("/create", createClient);
router.get("/", getAllClients);
router.get("/:id", getClientById);
router.get("/:clientId/consents", getConsentByClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
