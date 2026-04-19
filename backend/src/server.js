//@ts-check
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI no esta definida en el .env");
}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Estas conectado a la base de datos"))
  .catch(() => console.log("Error al conectar a la BBDD"));

import { router as StudioRoutes } from "./routes/StudioRoutes.js";
app.use("/api/studio", StudioRoutes);

import { router as ArtistsRoutes } from "./routes/ArtistRoutes.js";
app.use("/api/artists", ArtistsRoutes);

import { router as ClientsRoutes } from "./routes/ClientRoutes.js";
app.use("/api/clients", ClientsRoutes);

import { router as ConsentsRouter } from "./routes/ConsentRoutes.js";
app.use("/api/consents", ConsentsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`),
);
