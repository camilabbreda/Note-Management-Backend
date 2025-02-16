import { iNote } from '../../common/interface/entity-note';
import Note from '../../infrastructure/model/model-mgdb-note';

export default class RepositoryNoteMgdb {
  static async createNote(body: iNote) {
    const { title, content, userId } = body;
    const newNote = new Note({ title, content, userId });

    await newNote.save();
    return newNote;
  }

  static async getNotes() {
    const notes = await Note.find();
    return notes;
  }

  static async getNotesById(_id: string) {
    const note = await Note.findById(_id);
    return note;
  }

  static async getNotesByUserId(userId: string) {
    const note = await Note.find({ userId });
    return note;
  }

  static async updateNote(note: iNote) {
    const updatedNote = await Note.findByIdAndUpdate(note._id, note, {
      new: true,
    });
    return updatedNote;
  }
  static async deleteNote(_id: string) {
    const deletedNote = await Note.findByIdAndDelete(_id);
    return deletedNote;
  }
}
