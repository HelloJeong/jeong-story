import { Schema, model, Types } from "mongoose";
import { PostDocument, PostModel } from "../type";

const postSchema = new Schema<PostDocument>(
  {
    user: { type: Types.ObjectId, ref: "User" },
    feed: { type: String, required: true },
  },
  { timestamps: true }
);

postSchema.index({ createdAt: -1 });

const Post = model<PostDocument, PostModel>("Post", postSchema);

export default Post;
