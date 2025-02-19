import mongoose from 'mongoose';
export interface iNote {
  _id?: mongoose.Types.ObjectId | string;
  title?: string;
  content: string;
  userId?: mongoose.Types.ObjectId | string;
}
