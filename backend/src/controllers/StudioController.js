import { Artist } from "../models/ArtistModel.js";
import { Client } from "../models/ClientModel.js";
import { Consent } from "../models/ConsentModel.js";
import { Studio } from "../models/StudioModel.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} Next
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @description Obtiene todos los estudios de la base de datos.
 * Realiza una consulta para obtener todos los documentos de la colección de estudios y los devuelve en formato JSON con un código de estado 200.
 * Si ocurre un error, devuelve un mensaje de error con un código de estado 400.
 */
export const getAllStudios = async (req, res) => {
  const allStudios = await Studio.find();
  res.status(200).json(allStudios);
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Obtiene un estudio por su ID.
 * Realiza una consulta para encontrar un estudio en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el estudio no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el estudio se encuentra, devuelve el estudio en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const getStudioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studio = await Studio.findById(id);

    if (!studio) {
      return next({ status: 404, error: "Estudio no encontrado" });
    }
    return res.status(200).json(studio);
  } catch (err) {
    next(err);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Obtiene los artistas de un estudio por el ID del estudio.
 * Realiza una consulta para encontrar los artistas del estudio en la base de datos utilizando el ID del estudio proporcionado en los parámetros de la solicitud.
 * Si los artistas no se encuentran, devuelve un mensaje de error con un código de estado 404.
 * Si los artistas se encuentran, devuelve los artistas en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID del estudio no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const studioArtists = async (req, res, next) => {
  try {
    const { studioId } = req.params;
    const artists = await Artist.find({ studio: studioId });

    if (!artists) {
      return next({ status: 404, error: "Artistas no encontrados" });
    }
    res.status(200).json(artists);
  } catch (err) {
    next(err);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Obtiene los clientes de un estudio por el ID del estudio.
 * Realiza una consulta para encontrar los clientes del estudio en la base de datos utilizando el ID del estudio proporcionado en los parámetros de la solicitud.
 * Si los clientes no se encuentran, devuelve un mensaje de error con un código de estado 404.
 * Si los clientes se encuentran, devuelve los clientes en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID del estudio no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const studioClients = async (req, res, next) => {
  try {
    const { studioId } = req.params;
    const clients = await Client.find({ studio: studioId });

    if (!clients) {
      return next({ status: 404, error: "Cliente no enconstrado" });
    }

    return res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Obtiene los consentimientos de un estudio por el ID del estudio.
 * Realiza una consulta para encontrar los consentimientos del estudio en la base de datos utilizando el ID del estudio proporcionado en los parámetros de la solicitud.
 * Si los consentimientos no se encuentran, devuelve un mensaje de error con un código de estado 404.
 * Si los consentimientos se encuentran, devuelve los consentimientos en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID del estudio no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const studioConsents = async (req, res, next) => {
  try {
    const { studioId } = req.params;
    const consents = await Consent.find({ studio: studioId });

    if (!consents) {
      return next({ status: 404, error: "Consentimientos no encontrados" });
    }
    return res.status(200).json(consents);
  } catch (err) {
    next(err);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Actualiza un estudio por su ID.
 * Realiza una consulta para encontrar un estudio en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el estudio no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el estudio se encuentra, devuelve el estudio actualizado en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID del estudio no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const updateStudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateStudio = await Studio.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateStudio) {
      return next({ status: 404, error: "Estudio no encontrado" });
    }

    return res.status(200).json(updateStudio);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Elimina un estudio por su ID.
 * Realiza una consulta para encontrar un estudio en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el estudio no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el estudio se encuentra, devuelve el estudio eliminado con un código de estado 204.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID del estudio no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const deleteStudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteStudio = await Studio.findByIdAndDelete(id);

    if (!deleteStudio) {
      return next({ status: 404, error: "Estudio no encontrado" });
    }
    return res.status(204).json("Estudio eliminado");
  } catch (err) {
    next(err);
  }
};
