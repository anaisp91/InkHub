//@ts-check
import {
  getAllStudios,
  getStudioById,
  createStudio,
  studioArtists,
  studioClients,
  studioConsents,
  updateStudio,
  deleteStudio,
} from "../controllers/StudioController.js";
import express from "express";

const app = express();
export const router = express.Router();

router.post("/create", createStudio); //FUNCIONA
router.get("/", getAllStudios); //FUNCIONA
router.get("/:id", getStudioById); //FUNCIONA
router.get("/:studioId/artists", studioArtists); //FUNCIONA
router.get("/:studioId/clients", studioClients); //FUNCIONA
router.get("/:studioId/consents", studioConsents); //FUNCIONA
router.put("/:id", updateStudio); //FUNCIONA
router.delete("/:id", deleteStudio); //FUNCIONA
