import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  birthDate: { type: Date, required: true },
  persId: { type: String, required: true, unique: true },
  phoneNum: { type: String, required: true },
  email: { type: String },
  signature: { type: String, required: true }, //guardado de imagen como URL
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Studio",
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    requiored: true,
  },
});

const Client = mongoose.model("Client", ClientSchema);
export { Client, ClientSchema };
