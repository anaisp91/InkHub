import { Consent } from "../models/ConsentModel.js";

//creo consentimiento
export const createConsent = async (req, res) => {
  try {
    const newConsent = new Consent(req.body);
    const saveConsent = await newConsent.save();
    res.status(201).json(saveConsent);
  } catch (err) {
    res.status / (400).json({ error: err.message });
  }
};

//traigo todos los consentimientos
export const getAllConsents = async (req, res) => {
  const allConsents = await Consent.find();
  res.status(200).json(allConsents);
};

//traigo consentimiento por id
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
