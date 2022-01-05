import { Request, Router } from "express";
import User from "../models/User";
import { UserPartialType } from "../type";

const userRouter = Router();

userRouter.post("/signup", async (req: Request<{}, {}, UserPartialType>, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.json({ result: false, message: "email, password, name is required." });
      return;
    }

    const checkedUser = await User.findOne({ email });
    if (checkedUser) {
      res.json({ result: false, message: "email is a duplicate." });
      return;
    }

    const newUser = new User({ email, password, name });

    const user = await newUser.save();

    res.json({ result: true, user });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});
userRouter.post("/login", async (req: Request<{}, {}, UserPartialType>, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({ result: false, message: "email, password is required." });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.json({ result: false, message: "Please confirm your email and password." });
      return;
    }

    const compared = await user.comparePassword(password);
    if (!compared) {
      res.json({ result: false, message: "Please confirm your email and password." });
      return;
    }

    user.createToken();

    await user.save();

    res.cookie("auth", user.token, { httpOnly: true }).json({ result: true, user });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});
userRouter.post("/logout", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    if (token) {
      const user = await User.findOne({ token });
      if (user) {
        user.token = "";
        await user.save();
      }
    }
    res.clearCookie("auth").json({ result: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});

userRouter.get("/auth", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    if (!token) {
      res.json({ result: false });
      return;
    }
    const user = await User.findOne({ token });
    if (!user) {
      res.json({ result: false });
      return;
    }
    res.json({ result: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ err });
  }
});

export default userRouter;
