import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  adress: { type: String, required: true },
  age: { type: Number, requirted: true },
  persId: { type: String, required: true, unique: true },
  phoneNum: { type: Number, required: true },
  email: { type: String },
  signature: { type: String, required: true }, //guardado de imagen como URL
});
