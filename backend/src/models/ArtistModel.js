//@ts-check
import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    persId: { type: String, required: true, unique: true },
    phoneNum: { type: String, required: true },
    email: { type: String },
    SanNum: { type: String, required: true, unique: true }, //numero titulo higienico sanitario
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studio",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true },
);

const Artist = mongoose.model("Artist", ArtistSchema);
export { Artist, ArtistSchema };
