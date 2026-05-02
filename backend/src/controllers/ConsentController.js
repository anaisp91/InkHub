import { Consent } from "../models/ConsentModel.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} Next
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @description Crea un nuevo consentimiento en la base de datos.
 * Recibe los datos del consentimiento en el cuerpo de la solicitud (req.body) y los guarda en la base de datos.
 * Si la creación es exitosa, devuelve el consentimiento creado con un código de estado 201.
 * Si ocurre un error, devuelve un mensaje de error con un código de estado 400.
 */
export const createConsent = async (req, res) => {
  try {
    const { client, artist, studio, type, content, description, bodyArea } =
      req.body;

    if (!client || !artist || !studio || !content) {
      return res
        .status(400)
        .json({ error: "Client , artist, studio y content son obligatorios" });
    }

    const consent = new Consent({
      client,
      artist,
      studio,
      type,
      content,
      description,
      bodyArea,
      status: "pending",
      accepted: false,
    });
    const savedConsent = await consent.save();
    return res.status(201).json(savedConsent);
  } catch (err) {
    res.status(400).json({ error: "Error al crear el consentimiento" });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @description Firmar un consentimiento.
 * Recibe el ID del consentimiento en los parámetros de la solicitud (req.params) y lo firma en la base de datos.
 * Si el consentimiento no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el consentimiento se encuentra, lo firma y lo devuelve con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const signedConsent = async (req, res) => {
  try {
    const { id } = req.params;
    const consent = await Consent.findById(id);
    if (!consent) {
      return res.status(404).json({ error: "Consentimiento no encontrado" });
    }

    consent.status = "signed";
    consent.accepted = true;
    consent.signedAt = new Date();
    await consent.save();

    return res.json(consent);
  } catch (error) {
    return res.status(500).json({ error: "error al firmar el consentimiento" });
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @description Obtiene todos los consentimientos de la base de datos.
 * Realiza una consulta para obtener todos los documentos de la colección de consentimientos y los devuelve en formato JSON con un código de estado 200.
 * Si ocurre un error, devuelve un mensaje de error con un código de estado 400.
 */
export const getAllConsents = async (req, res) => {
  const allConsents = await Consent.find();
  res.status(200).json(allConsents);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Obtiene un consentimiento por su ID.
 * Realiza una consulta para encontrar un consentimiento en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el consentimiento no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el consentimiento se encuentra, devuelve el consentimiento en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const getConsentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const consent = await Consent.findById(id);

    if (!consent) {
      return res.status(404).json({ error: "Consentimiento no enconrado" });
    }
    return res.status(200).json(consent);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Actualiza un consentimiento por su ID.
 * Realiza una consulta para encontrar un consentimiento en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el consentimiento no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el consentimiento se encuentra, devuelve el consentimiento actualizado con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const updateConsent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateConsent = await Consent.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateConsent) {
      return res.status(404).json({ error: "Consentimiento no encontrado" });
    }
    return res.status(200).json(updateConsent);
  } catch (err) {
    next(err);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Elimina un consentimiento por su ID.
 * Realiza una consulta para encontrar un consentimiento en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el consentimiento no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el consentimiento se encuentra, devuelve el consentimiento eliminado con un código de estado 204.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const deleteConsent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteConsent = await Consent.findByIdAndDelete(id);

    if (!deleteConsent) {
      return res.status(404).json("Consentimiento no encontrado");
    }

    return res.status(204).json("Consentimiento eliminado");
  } catch (err) {
    next(err);
  }
};
