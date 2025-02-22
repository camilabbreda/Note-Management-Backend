import { Request, Response } from 'express';
import { iUser } from '../../common/interface/entity-user';
import ServiceUser from '../service/service-user';
import { ReturnResponse } from '../../common/dtos/return-response.dto';
import { ReturnError } from '../../common/dtos/return-error.dto';

export default class ControllerUser {
  static async createUser(
    req: Request,
    res: Response,
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const body: iUser = req.body;
      const response = await ServiceUser.createUser(body);
      return new ReturnResponse(res, 201, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }

  static async getAllUsers(
    _: Request,
    res: Response,
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const response = await ServiceUser.getAllUsers();
      return new ReturnResponse(res, 200, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }

  static async getUserById(
    req: Request,
    res: Response,
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const { _id } = req.params;
      const response = await ServiceUser.getUserById(_id);
      return new ReturnResponse(res, 200, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const { _id } = req.params;
      const response = await ServiceUser.deleteUser(_id);
      return new ReturnResponse(res, 200, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }

  static async updateUser(
    req: Request,
    res: Response,
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const { _id } = req.params;
      const body: iUser = req.body;
      await ServiceUser.updateUser(_id, body);
      return new ReturnResponse(res, 204, 'Success', undefined);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }

  static async loginUser(
    req: Request,
    res: Response,
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const { email, password } = req.body;
      const response = await ServiceUser.loginUser(email, password);
      return new ReturnResponse(res, 200, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
}
