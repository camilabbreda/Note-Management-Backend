import mongoose from 'mongoose';
import { iNote } from './entity-note';

export interface iUser {
  _id?: mongoose.Types.ObjectId | string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  notes?: iNote[];
}
