import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fame: { type: Number, default: 40 },
    favorites: [{ type: String }], // Array of post IDs (creator + post name)
  },
  { collection: "user" }
);

const User = mongoose.model("User", UserSchema);

export default User;
