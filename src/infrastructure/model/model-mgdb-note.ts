import mongoose, { Schema } from 'mongoose';
import { iNote } from '../../common/interface/entity-note';

export const NoteSchema = new Schema<iNote>({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

NoteSchema.set('timestamps', true);

export default mongoose.model<iNote>('Note', NoteSchema);
