import { UserDocument, UserModel } from "../type";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;
const secret = "jeong-story";

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "" },
    token: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (plainPassword: string) {
  try {
    return bcrypt.compare(plainPassword, this.password);
  } catch (err) {
    throw err;
  }
};

userSchema.methods.createToken = function () {
  const user = this;
  user.token = jwt.sign({ email: user.email }, secret);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
    return;
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    // @ts-ignore
    const hash = await bcrypt.hash(user.password, salt);
    // @ts-ignore
    user.password = hash;
    next();
  } catch (err) {
    throw err;
  }
});

const User = model<UserDocument, UserModel>("User", userSchema);

export default User;
