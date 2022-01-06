import { Model, ObjectId } from "mongoose";

/* User */
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

export interface UserModel extends Model<UserDocument> {}

export type UserPartialType = Partial<UserType>;

/* Post */
export interface PostType {
  user: ObjectId;
  feed: string;
}

export interface PostDocument extends PostType, Document {
  _id: ObjectId;
}

export interface PostModel extends Model<PostDocument> {}

export type PostPartialType = Partial<PostType>;
