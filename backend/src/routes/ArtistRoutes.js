//@ts-check

import {
  createArtist,
  getAllArtist,
  getArtistById,
  updateArtist,
  deleteArtist,
} from "../controllers/ArtistController.js";
import express from "express";

const app = express();
export const router = express.Router();

router.post("/create", createArtist); //FUNCIONA
router.get("/", getAllArtist); //FUNCIONA
router.get("/:id", getArtistById); //FUNCIONA
router.put("/:id", updateArtist); //FUNCIONA
router.delete("/:id", deleteArtist); //FUNCIONA
