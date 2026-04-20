import { Client } from "../models/ClientModel.js";
import { Consent } from "../models/ConsentModel.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} Next
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Crea un nuevo cliente en la base de datos.
 * Recibe los datos del cliente en el cuerpo de la solicitud (req.body) y los guarda en la base de datos.
 * Si la creación es exitosa, devuelve el cliente creado con un código de estado 201.
 * Si ocurre un error, devuelve un mensaje de error con un código de estado 400.
 */
export const createClient = async (req, res, next) => {
  try {
    const newClient = new Client(req.body);
    const saveClient = await newClient.save();
    res.status(201).json(saveClient);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @description Obtiene todos los clientes de la base de datos.
 * Realiza una consulta para obtener todos los documentos de la colección de clientes y los devuelve en formato JSON con un código de estado 200.
 */
export const getAllClients = async (req, res) => {
  const allClients = await Client.find();
  res.status(200).json(allClients);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Obtiene un cliente por su ID.
 * Realiza una consulta para encontrar un cliente en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el cliente no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el cliente se encuentra, devuelve el cliente en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ error: "Cliente no enconstrado" });
    }
    res.status(200).json(client);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Obtiene los consentimientos de un cliente por el ID del cliente.
 * Realiza una consulta para encontrar los consentimientos del cliente en la base de datos utilizando el ID del cliente proporcionado en los parámetros de la solicitud.
 * Si los consentimientos no se encuentran, devuelve un mensaje de error con un código de estado 404.
 * Si los consentimientos se encuentran, devuelve los consentimientos en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID del cliente no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const getConsentByClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const consent = await Consent.find({ client: clientId });

    if (!consent) {
      return res.status(404).json("Consetimiento no encontrado");
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
 * @description Actualiza un cliente por su ID.
 * Realiza una consulta para encontrar un cliente en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el cliente no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el cliente se encuentra, devuelve el cliente actualizado en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID del cliente no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateClient) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    return res.status(200).json(updateClient);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Elimina un cliente por su ID.
 * Realiza una consulta para encontrar un cliente en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el cliente no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el cliente se encuentra, devuelve un mensaje de éxito con un código de estado 204.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID del cliente no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteClient = await Client.findByIdAndDelete(id);

    if (!deleteClient) {
      return res.status(404).json("Cliente no encontrado");
    }

    return res.status(204).json("Cliente eliminado");
  } catch (err) {
    next(err);
  }
};
