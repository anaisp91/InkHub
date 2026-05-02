//@ts-check
import {
  getAllStudios,
  getStudioById,
  studioArtists,
  studioClients,
  studioConsents,
  updateStudio,
  deleteStudio,
} from "../controllers/StudioController.js";
import express from "express";

const app = express();
export const router = express.Router();

router.get("/", getAllStudios);
router.get("/:id", getStudioById);
router.get("/:studioId/artists", studioArtists);
router.get("/:studioId/clients", studioClients);
router.get("/:studioId/consents", studioConsents);
router.put("/:id", updateStudio);
router.delete("/:id", deleteStudio);
