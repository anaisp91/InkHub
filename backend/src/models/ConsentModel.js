//@ts-check
import mongoose, { trusted } from "mongoose";

const ConsentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    type: { type: String },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "signed", "rejected"],
      default: "pending",
    },
    content: {
      type: String,
      required: true,
    },
    accepted: {
      type: Boolean,
      required: true,
    },
    description: { type: String },
    bodyArea: { type: String },
    signedAt: { type: Date },
  },
  { timestamps: true },
);

const Consent = mongoose.model("Consent", ConsentSchema);
export { Consent };
