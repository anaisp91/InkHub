import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  birthDate: { type: Date, required: true },
  persId: { type: String, required: true, unique: true },
  phoneNum: { type: String, required: true },
  email: { type: String },
  signature: { type: String, required: true, unique: true }, //guardado de imagen como URL
});

const Client = mongoose.model("Client", ClientSchema);
export default Client;
