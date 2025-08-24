import mongoose from "mongoose";


const UserSchema = new mongoose.Schema( {
    name: { type: String, required: true },
    fame: { type: Number, default: 40},
})

const User = mongoose.model("User", UserSchema);

export default User;