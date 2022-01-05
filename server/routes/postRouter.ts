import { PostPartialType } from "./../type";
import { Request, Router } from "express";
import User from "../models/User";
import Post from "../models/Post";

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

export default postRouter;
