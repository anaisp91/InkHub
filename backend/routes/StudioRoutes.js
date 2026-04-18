import {
  getAllStudios,
  getStudioById,
  createStudio,
  studioArtists,
  updateStudio,
  studioClients,
} from "../controllers/StudioController.js";
import express from "express";

const app = express();
export const router = express.Router();

router.post("/create", createStudio);
router.get("/", getAllStudios);
router.get("/:id", getStudioById);
router.get("/:studio/artists", studioArtists);
router.get("/:studio/clients", studioClients);

router.put("/update/:id", updateStudio);
