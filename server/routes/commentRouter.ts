import { CommentPartialType, CommentQueryType } from "../type";
import { Request, Router } from "express";
import User from "../models/User";
import Comment from "../models/Comment";
import { isValidObjectId } from "mongoose";

const commentRouter = Router({ mergeParams: true });

commentRouter.get("/", async (req: Request<CommentQueryType, {}, CommentPartialType>, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.json({ result: false });
      return;
    }

    const comments = await Comment.find({ post: id });

    res.json({ result: true, comments });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});

commentRouter.post("/", async (req: Request<CommentQueryType, {}, CommentPartialType>, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    if (!token) {
      res.json({ result: false });
      return;
    }
    const tokenUser = await User.findOne({ token });
    if (!tokenUser) {
      res.json({ result: false });
      return;
    }

    const { id } = req.params; // post id
    if (!isValidObjectId(id)) {
      res.json({ result: false });
      return;
    }

    const { text } = req.body;

    const newComment = new Comment({ post: id, user: tokenUser._id, text });

    const comment = await newComment.save();

    res.json({ result: true, comment });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});

commentRouter.put(
  "/:commentId",
  async (req: Request<CommentQueryType, {}, CommentPartialType>, res) => {
    try {
      const { authorization } = req.headers;
      const token = authorization?.split(" ")[1];
      if (!token) {
        res.json({ result: false });
        return;
      }
      const tokenUser = await User.findOne({ token });
      if (!tokenUser) {
        res.json({ result: false });
        return;
      }

      const { id, commentId } = req.params;
      if (!isValidObjectId(id) || !isValidObjectId(commentId)) {
        res.json({ result: false });
        return;
      }

      const comment = await Comment.findOne({ post: id, _id: commentId, user: tokenUser._id });

      if (!comment) {
        res.json({ result: false });
        return;
      }
      const { text } = req.body;

      comment.text = text || comment.text;

      const saveComment = await comment.save();

      res.json({ result: true, comment: saveComment });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ err });
    }
  }
);

commentRouter.delete(
  "/:commentId",
  async (req: Request<CommentQueryType, {}, CommentPartialType>, res) => {
    try {
      const { authorization } = req.headers;
      const token = authorization?.split(" ")[1];
      if (!token) {
        res.json({ result: false });
        return;
      }
      const tokenUser = await User.findOne({ token });
      if (!tokenUser) {
        res.json({ result: false });
        return;
      }

      const { id, commentId } = req.params;
      if (!isValidObjectId(id) || !isValidObjectId(commentId)) {
        res.json({ result: false });
        return;
      }

      const comment = await Comment.deleteOne({ post: id, _id: commentId, user: tokenUser._id });

      if (!comment) {
        res.json({ result: false });
        return;
      }

      res.json({ result: true });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ err });
    }
  }
);

export default commentRouter;
