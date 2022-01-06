import { Schema, model, Types } from "mongoose";
import { CommentDocument, CommentModel } from "../type";

const commentSchema = new Schema<CommentDocument>(
  {
    post: { type: Types.ObjectId, ref: "Post" },
    user: { type: Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

commentSchema.index({ createdAt: -1 });

const Comment = model<CommentDocument, CommentModel>("Comment", commentSchema);

export default Comment;
