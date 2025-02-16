import { AppException } from '../../common/error/app-exception';
import RepositoryNoteMgdb from '../repository/repository-mgdb-note';
import { noteValidation } from '../../common/util/function/validation';
import { iNote } from '../../common/interface/entity-note';
import RepositoryUserMgdb from '../repository/repository-mgdb-user';
import { BadRequestException } from '../../common/error/bad-request-esception';

export default class ServiceNote {
  static async createNote(body: iNote): Promise<iNote> {
    noteValidation(body, 'POST');
    const data: iNote = body;
    const note = await RepositoryNoteMgdb.createNote(data);

    if (!note) {
      throw new AppException('Error occured during note creation.', 500);
    }

    await RepositoryUserMgdb.addNoteToUser(
      note.userId as string,
      note._id as string,
    );
    return note;
  }

  static async deleteNote(_id: string): Promise<string> {
    if (!_id) new BadRequestException('Please inform note _id.');
    const note = await RepositoryNoteMgdb.getNotesById(_id);
    if (!note) return 'Note is already deleted';
    await RepositoryNoteMgdb.deleteNote(_id);
    await RepositoryUserMgdb.removeNoteFromUser(
      note.userId as string,
      note._id as string,
    );
    return 'Note was successfully deleted.';
  }

  static async updateNote(_id: string, body: iNote) {
    body._id = _id;
    const note: iNote = body;
    noteValidation(note, 'PUT');
    await RepositoryNoteMgdb.updateNote(note);
    return 'Note was successfully updated.';
  }

  static async getNoteById(_id: string) {
    if (!_id) throw new BadRequestException('Please, inform note _id.');
    const note = await RepositoryNoteMgdb.getNotesById(_id);
    return note;
  }

  static async getNotesByUserId(userId: string) {
    if (!userId) throw new BadRequestException('Please, inform userId.');
    const notes = await RepositoryNoteMgdb.getNotesByUserId(userId);
    return notes;
  }

  static async getAllNotes() {
    const notes = await RepositoryNoteMgdb.getNotes();
    return notes;
  }
}
