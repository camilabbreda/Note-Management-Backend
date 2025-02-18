import mongoose, { Schema } from 'mongoose';
import { iUser } from '../../common/interface/entity-user';

const UserSchema = new Schema<iUser>({
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  notes: { type: [mongoose.Schema.Types.ObjectId], required: false },
});

UserSchema.set('timestamps', true);

// UserSchema.virtual('_id').get(function() {
//   return this._id.toString();
// });

// UserSchema.set('toJSON', {
//   virtuals: true,
// });

export default mongoose.model<iUser>('User', UserSchema);
