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

router.post("/create", createClient); //FUNCIONA
router.get("/", getAllClients); //FUNCIONA
router.get("/:id", getClientById); //FUNCIONA
router.get("/:clientId/consents", getConsentByClient); //FUNCIONA
router.put("/:id", updateClient); //FUNCIONA
router.delete("/:id", deleteClient); //FUNCIONA
