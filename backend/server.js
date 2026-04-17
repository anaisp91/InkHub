import express from "express";
import mongoose from "mongoose";

//! require("dotenv").config(); error de definicion, cambio de importacion
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Estas conectado a la base de datos"))
  .catch(() => console.log("Error al conectar a la BBDD"));

app.get("/", (req, res) => {
  res.send("Servidor funcionando en MongoDB");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`),
);
