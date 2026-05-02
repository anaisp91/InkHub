import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["studio", "artist"], required: true },
    password: { type: String, required: true, minlength: 6 },
    studio: { type: mongoose.Schema.Types.ObjectId, ref: "Studio" },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
export { User, UserSchema };
