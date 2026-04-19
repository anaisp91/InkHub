//@ts-check
import mongoose from "mongoose";

const ConsentSchema = new mongoose.Schema(
  {
    ClientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    type: { type: String },
    ArtistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    StudioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: true,
    },
  },
  { timestamps: true },
);

const Consent = mongoose.model("Consent", ConsentSchema);
export { Consent };
