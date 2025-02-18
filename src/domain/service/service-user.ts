import { AppException } from '../../common/error/app-exception';
import { NotFoundException } from '../../common/error/not-found-exception';
import { iUser } from '../../common/interface/entity-user';
import {
  comparePassword,
  generateToken,
  hashPassword,
} from '../../common/util/auth/auth';
import dataFormatting from '../../common/util/function/data-formatting';
import userValidation from '../../common/util/function/validation';
import RepositoryUserMgdb from '../repository/repository-mgdb-user';
import { BadRequestException } from '../../common/error/bad-request-esception';

export default class ServiceUser {
  static async createUser(body: iUser): Promise<iUser> {
    await userValidation(body, 'POST');

    const data: iUser = dataFormatting(body);
    data.password = await hashPassword(data.password as string);
    const user = await RepositoryUserMgdb.createUser(data);

    if (!user) {
      throw new AppException('Error occured during user register.', 500);
    }

    user.password = 'secret';
    return user;
  }

  static async deleteUser(_id: string): Promise<string> {
    if (!_id) new BadRequestException('Please inform user _id.');
    await RepositoryUserMgdb.deleteUser(_id);
    return 'User was successfully deleted.';
  }

  static async updateUser(_id: string, body: iUser) {
    body._id = _id;
    await userValidation(body, 'PUT');
    const data: iUser = dataFormatting(body);
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    data._id = _id;
    await RepositoryUserMgdb.updateUser(data);
    return 'User was successfully updated.';
  }

  static async getAllUsers() {
    const response = await RepositoryUserMgdb.getAllUsers();
    if (!response || response.length === 0) {
      new NotFoundException('There is no user registered yet.');
    }
    return response;
  }
  static async getUserById(_id: string) {
    const response = await RepositoryUserMgdb.getUserById(_id);
    if (!response) {
      new NotFoundException('User not found.');
    }
    return response;
  }

  static async loginUser(email: string, password: string) {
    const user = await RepositoryUserMgdb.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await comparePassword(password, user.password as string);
    if (!isMatch) {
      throw new AppException('Invalid credentials', 401);
    }
    delete user.password;
    const token = generateToken(user);
    return { token };
  }
}
