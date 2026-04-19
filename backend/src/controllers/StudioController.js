import { Artist } from "../models/ArtistModel.js";
import { Client } from "../models/ClientModel.js";
import { Studio } from "../models/StudioModel.js";

//creamos estudio

export const createStudio = async (req, res) => {
  try {
    const newStudio = new Studio(req.body);
    const saveStudio = await newStudio.save();
    res.status(201).json(saveStudio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//traemos todos los estudios
export const getAllStudios = async (req, res) => {
  const allStudios = await Studio.find();
  res.status(200).json(allStudios);
};

//traemos estudio por Id
export const getStudioById = async (req, res) => {
  try {
    const { id } = req.params;
    const studio = await Studio.findById(id);

    if (!studio) {
      return res.status(404).json({ error: "Estudio no encontrado" });
    }
    return res.status(200).json(studio);
  } catch (err) {
    res.status(400).json("ID no valido");
  }
};

//traigo artistas por id de estudio
export const studioArtists = async (req, res) => {
  try {
    const { studioId } = req.params;
    const artists = await Artist.find({ studio: studioId });

    if (!artists) {
      return res.status(404).json({ error: "Artistas no encontrados" });
    }
    res.status(200).json(artists);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//traigo clientes por id de estudio
export const studioClients = async (req, res) => {
  try {
    const { studioId } = req.params;
    const clients = await Client.find({ studio: studioId });

    if (!clients) {
      return res.status(404).json({ error: "Cliente no enconstrado" });
    }

    return res.status(200).json(clients);
  } catch (err) {
    return res.status(400).json("Id invalido");
  }
};

//traigo consentimientos por id de estudio

//actualizamos estudio
export const updateStudio = async (req, res) => {
  try {
    const { id } = req.params;
    const studio = await Studio.findByIdAndUpdate(id);

    if (!studio) {
      return res.status(404).json({ error: "Estudio no encontrado" });
    }
    return res.status(201).json(studio);
  } catch (err) {
    res.status(400).json("ID no valido");
  }
};

//eliminamos estudio

export const deleteStudio = async (req, res) => {
  try {
    const { id } = req.params;
    const studio = await Studio.findByIdAndDelete(id);
  } catch (err) {}
};
