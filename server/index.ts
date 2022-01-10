import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter";
import dbInstance from "./services/dbConnect";
import postRouter from "./routes/postRouter";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ? +process.env.PORT : 3333;

async function main() {
  try {
    await dbInstance;

    console.log(`db connected!!`);

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use("/api/user", userRouter);
    app.use("/api/post", postRouter);

    app.listen(PORT, () => {
      console.log(`Express server listening on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
