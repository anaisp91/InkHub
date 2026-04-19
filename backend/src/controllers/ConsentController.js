import { Consent } from "../models/ConsentModel.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @abstraction Crea un nuevo consentimiento en la base de datos.
 * Recibe los datos del consentimiento en el cuerpo de la solicitud (req.body) y los guarda en la base de datos.
 * Si la creación es exitosa, devuelve el consentimiento creado con un código de estado 201.
 * Si ocurre un error, devuelve un mensaje de error con un código de estado 400.
 */
export const createConsent = async (req, res) => {
  try {
    const newConsent = new Consent(req.body);
    const saveConsent = await newConsent.save();
    res.status(201).json(saveConsent);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
 * @description Obtiene un consentimiento por su ID.
 * Realiza una consulta para encontrar un consentimiento en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el consentimiento no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el consentimiento se encuentra, devuelve el consentimiento en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const getConsentById = async (req, res) => {
  try {
    const { id } = req.params;
    const consent = await Consent.findById(id);

    if (!consent) {
      return res.status(404).json({ error: "Consentimiento no enconrado" });
    }
    return res.status(200).json(consent);
  } catch (err) {
    return res.status(400).json("Id invalido");
  }
};

//actualizo consentimiento

//elimino consentimiento
