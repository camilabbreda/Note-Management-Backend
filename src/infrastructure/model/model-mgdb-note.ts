import mongoose, { Schema } from 'mongoose';
import { iNote } from '../../common/interface/entity-note';

export const NoteSchema = new Schema<iNote>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

NoteSchema.set('timestamps', true);
// NoteSchema.virtual('_id').get(function() {
//   return this._id.toString();
// });
// NoteSchema.set('toJSON', {
//   virtuals: true,
// });

export default mongoose.model<iNote>('Note', NoteSchema);
