import { Client } from "../models/ClientModel.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 *
 * @param {Request} req
 * @param {Response} res
 * @description Crea un nuevo cliente en la base de datos.
 * Recibe los datos del cliente en el cuerpo de la solicitud (req.body) y los guarda en la base de datos.
 * Si la creación es exitosa, devuelve el cliente creado con un código de estado 201.
 * Si ocurre un error, devuelve un mensaje de error con un código de estado 400.
 */
export const createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const saveClient = await newClient.save();
    res.status(201).json(saveClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
 * @description Obtiene un cliente por su ID.
 * Realiza una consulta para encontrar un cliente en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * Si el cliente no se encuentra, devuelve un mensaje de error con un código de estado 404.
 * Si el cliente se encuentra, devuelve el cliente en formato JSON con un código de estado 200.
 * Si ocurre un error durante la consulta (por ejemplo, si el ID no es válido), devuelve un mensaje de error con un código de estado 400.
 */
export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ error: "Cliente no enconstrado" });
    }
    res.status(200).json(client);
  } catch (err) {
    return res.status(400).json("Id invalido");
  }
};

//actualizo cliente

//elimino cliente
