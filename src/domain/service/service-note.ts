import { v4 as uuidv4 } from 'uuid';
import { AppException } from '../../common/error/app-exception';
import RepositoryNoteMgdb from '../repository/repository-mgdb-note';
import { noteValidation } from '../../common/util/function/validation';
import { iNote } from '../../common/interface/entity-note';

export default class ServiceNote {
  static async createNote(body: iNote): Promise<iNote> {
    noteValidation(body);
    const data: iNote = body;
    data._id = uuidv4();
    const note = await RepositoryNoteMgdb.createNote(data);

    if (!note) {
      throw new AppException('Error occured during note creation.', 500);
    }
    return note;
  }

}
