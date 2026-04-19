//@ts-check
import {
  createArtist,
  getAllArtist,
  getArtistById,
} from "../controllers/ArtistController.js";
import express from "express";

const app = express();
export const router = express.Router();

router.post("/create", createArtist);
router.get("/", getAllArtist);
router.get("/:id", getArtistById);
