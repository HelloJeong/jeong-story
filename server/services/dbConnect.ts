import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

export default mongoose.connect(MONGO_URI);
