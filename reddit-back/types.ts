import mongoose, {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string
}

export interface UserMethods {
  checkPassword(password: string): Promise<Boolean>;

  generateToken(): void
}

export type UserModel = Model<UserFields, {}, UserMethods>


export interface postMutation {
  author: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string | null;
  datetime: string
}

export interface commentMutation {
  author: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  text: string;
  createdAt: string
}