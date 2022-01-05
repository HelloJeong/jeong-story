import { Model } from "mongoose";

export interface UserType {
  email: string;
  password: string;
  name: string;
  token: string;
}

export interface UserDocument extends UserType, Document {
  comparePassword: (plainPassword: string) => Promise<boolean>;
  createToken: () => void;
}

// static
export interface UserModel extends Model<UserDocument> {}

export type UserPartialType = Partial<UserType>;
