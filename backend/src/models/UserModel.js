import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["studio", "artist"], required: true },
  password: { type: String, required: true, minlength: 6 },
  studioId: { type: mongoose.Schema.Types.ObjectId, ref: "Studio" },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model("User", UserSchema);
export { User, UserSchema };
