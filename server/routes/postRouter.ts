import { PostPartialType } from "./../type";
import { Request, Router } from "express";
import User from "../models/User";
import Post from "../models/Post";
import { isValidObjectId } from "mongoose";

const postRouter = Router();

postRouter.get("/", async (req: Request<{}, {}, PostPartialType>, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json({ result: true, posts });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});

postRouter.post("/", async (req: Request<{}, {}, PostPartialType>, res) => {
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

    const { user, feed } = req.body;
    if (user !== tokenUser._id.toString()) {
      res.json({ result: false });
      return;
    }

    const newPost = new Post({
      user: user,
      feed,
    });
    const post = await newPost.save();

    res.json({ result: true, post });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});

postRouter.put("/:id", async (req: Request<{ id: string }, {}, PostPartialType>, res) => {
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

    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.json({ result: false });
      return;
    }

    const { feed } = req.body;

    const post = await Post.findOne({ _id: id, user: tokenUser._id });

    if (!post) {
      res.json({ result: false });
      return;
    }

    post.feed = feed || post.feed;

    const savePost = await post.save();

    res.json({ result: true, post: savePost });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});

postRouter.delete("/:id", async (req: Request<{ id: string }, {}, PostPartialType>, res) => {
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

    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.json({ result: false });
      return;
    }

    const post = await Post.deleteOne({ _id: id, user: tokenUser._id });
    if (!post) {
      res.json({ result: false });
      return;
    }

    res.json({ result: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});

export default postRouter;
