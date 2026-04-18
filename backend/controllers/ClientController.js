import { Client } from "../models/ClientModel.js";

//creo Cliente
export const createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const saveClient = await newClient.save();
    res.status(201).json(saveClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//traigo todos los clientes
export const getAllClients = async (req, res) => {
  const allClients = await Client.find();
  res.status(200).json(allClients);
};

//traido cliente por id
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
