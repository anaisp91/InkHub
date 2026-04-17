import { Studio, StudioSchema } from "../models/StudioModel";

//traemos todos los estudios

//traemos estudio por ObjectId

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
//actualizamos estudio

//eliminamos estudio
