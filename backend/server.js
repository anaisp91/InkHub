import express from "express";
import mongoose from "mongoose";

//! require("dotenv").config(); error de definicion, cambio de importacion
import dotenv from "dotenv";
dotenv.config();

//*IMPORTACION MODELOS
import { Studio } from "./models/StudioModel.js";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Estas conectado a la base de datos"))
  .catch(() => console.log("Error al conectar a la BBDD"));

// //*RUTAS CREAR ESTUDIO
// app.post("/createStudio", async (req, res) => {
//   try {
//     const newStudio = new Studio(req.body);
//     const saveStudio = await newStudio.save();
//     res.status(201).json(saveStudio);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

//*RUTA PARA TRAER LOS estudios
app.get("/", async (req, res) => {
  const allStudios = await Studio.find();
  res.json(allStudios);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`),
);
