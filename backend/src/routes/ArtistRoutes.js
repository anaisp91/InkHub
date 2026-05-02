//@ts-check

import {
  getAllArtist,
  getArtistById,
  updateArtist,
  deleteArtist,
} from "../controllers/ArtistController.js";
import express from "express";

const app = express();
export const router = express.Router();

router.get("/", getAllArtist);
router.get("/:id", getArtistById);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);
