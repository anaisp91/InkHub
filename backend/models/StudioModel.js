import mongoose from "mongoose";

const StudioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNum: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
  },
  { timestamps: true },
);

const Studio = mongoose.model("Studio", StudioSchema);
export { Studio, StudioSchema };
