import { iUser } from '../../common/interface/entity-user';
import User from '../../infrastructure/model/model-mgdb-user';

export default class RepositoryUserMgdb {
  static async createUser(body: iUser) {
    const { firstName, email, _id, lastName, password, userName } = body;
    const newUser = new User({
      firstName,
      email,
      _id,
      lastName,
      password,
      userName,
    });

    await newUser.save();
    return newUser as iUser;
  }

  static async getAllUsers() {
    const users = await User.find();
    return users as iUser[];
  }

  static async getUserById(_id: string) {
    const user = await User.findById(_id);
    return user as iUser;
  }

  static async getUserByUsername(userName: string) {
    const user = await User.findOne({ userName });
    return user as iUser;
  }
  static async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    return user as iUser;
  }

  static async updateUser(user: iUser) {
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    return updatedUser as iUser;
  }

  static async deleteUser(_id: string) {
    const deletedUser = await User.findByIdAndDelete(_id);
    return deletedUser;
  }

  static async addNoteToUser(userId: string, noteId: string) {
    return await User.findByIdAndUpdate(
      userId,
      { $push: { notes: noteId } },
      { new: true }
    );
  }

  static async removeNoteFromUser(userId: string, noteId: string) {
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { notes: noteId } },
      { new: true }
    );
  }

  static async getUserNotes(userId: string) {
    return await User.findById(userId).populate('notes');
  }
}
