import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  likes: {
    type: Number,
    default: 0,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
