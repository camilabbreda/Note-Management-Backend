import mongoose, { Schema } from 'mongoose';
import { iUser } from '../../common/interface/entity-user';
import { NoteSchema } from './model-mgdb-note';

const UserSchema = new Schema<iUser>({
  _id: { type: String, required: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  notes: { type: [NoteSchema], required: false },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.set('timestamps', true);

export default mongoose.model<iUser>('User', UserSchema);
