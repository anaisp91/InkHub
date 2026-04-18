import { Artist } from "../models/ArtistModel.js";

//creamos artista
export const createArtist = async (req, res) => {
  try {
    const newArtist = new Artist(req.body);
    const saveArtist = await newArtist.save();
    res.status(201).json(saveArtist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//traemos todos los artistas
export const getAllArtist = async (req, res) => {
  const allArtists = await Artist.find();
  res.status(200).json(allArtists);
};

//traemos un artista por Id
export const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    return res.status(200).json(artist);
  } catch (err) {
    res.status(400).json("Id invalido");
  }
};

//actualizamos artista por id

//eliminamos artista por id
