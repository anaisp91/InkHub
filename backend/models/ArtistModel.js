import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  persId: { type: String, unique: true },
  phoneNum: { type: String, required: true },
  email: { type: String },
  SanNum: { type: String, required: true, unique: true }, //numero titulo higienico sanitario
  SanTitle: { type: String, required: true, unique: true }, //url-imagen titulo higienico sanitario
  signature: { type: String, required: true, unique: true }, //url-imagen firma para usar en consentimientos
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;
