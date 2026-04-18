import {
  createClient,
  getAllClients,
  getClientById,
} from "../controllers/ClientController.js";

import express from "express";

const app = express();
export const router = express.Router();

router.post("/create", createClient);
router.get("/", getAllClients);
router.get("/:id", getClientById);
