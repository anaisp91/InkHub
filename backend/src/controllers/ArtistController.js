//@ts-check
import { Artist } from "../models/ArtistModel.js";
import { Consent } from "../models/ConsentModel.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} Next
 */
/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Crea un nuevo artista en la base de datos.
 * Recibe los datos del artista en el cuerpo de la solicitud (req.body) y los guarda en la base de datos.
 * Si la creación es exitosa, devuelve el artista creado con un código de estado 201.
 * Si ocurre un error, devuelve un mensaje de error con un código de estado 400.
 */
export const createArtist = async (req, res, next) => {
  try {
    const newArtist = new Artist(req.body);
    const savedArtist = await newArtist.save();
    return res.status(201).json(savedArtist);
  } catch (err) {
    next(err);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @description Obtiene todos los artistas de la base de datos.
 * Realiza una consulta para obtener todos los documentos de la colección de artistas y los devuelve en formato JSON con un código de estado 200.
 * Si ocurre un error, devuelve un mensaje de error con un código de estado 400.
 */
export const getAllArtist = async (req, res) => {
  const allArtists = await Artist.find();
  res.status(200).json(allArtists);
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Obtiene un artista por su ID.
 * Realiza una consulta para encontrar un artista en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el artista no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el artista se encuentra, devuelve el artista en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const getArtistById = async (req, res, next) => {
  try {
    /**
     * @typedef {Object} id
     */
    const { id } = req.params;
    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    return res.status(200).json(artist);
  } catch (err) {
    next(err);
  }
};

/**
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Actualiza un artista por su ID.
 * Realiza una consulta para encontrar un artista en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el artista no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el artista se encuentra, devuelve el artista actualizado en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const updateArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateArtist = await Artist.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateArtist) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(updateArtist);
  } catch (err) {
    next(err);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Elimina un artista por su ID.
 * Realiza una consulta para encontrar un artista en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el artista no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el artista se encuentra, devuelve el artista eliminado con un código de estado 204.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteArtist = await Artist.findByIdAndDelete(id);

    if (!deleteArtist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    return res.status(204).json("Artista eliminado");
  } catch (err) {
    next(err);
  }
};
