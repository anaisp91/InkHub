import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["studio_admin", "artist"], required: true },
  password: { type: String, required: true, minlength: 6 },
  studio: { type: mongoose.Schema.Types.ObjectId, ref: "Studio" },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
});

const User = mongoose.model("User", UserSchema);
export { User, UserSchema };
