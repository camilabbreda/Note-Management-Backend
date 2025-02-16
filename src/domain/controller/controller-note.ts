import { Request, Response } from 'express';
import { ReturnResponse } from '../../common/dtos/return-response.dto';
import { ReturnError } from '../../common/dtos/return-error.dto';

export default class ControllerNote {
  static async createNote(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      // const body: iNote = req.body;
      // const response: iNote = await ServiceNote.createNote(body);
      return new ReturnResponse(res, 201, 'Success', 'response');
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async getAllNotes(
    _: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      // const response: iNote[] = await ServiceNote.getAllNotes();
      return new ReturnResponse(res, 200, 'Success', 'response');
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async getNoteById(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      // const { _id } = req.params;
      // const response: iNote = await ServiceNote.getNoteById(_id);
      return new ReturnResponse(res, 200, 'Success', 'response');
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async deleteNote(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      // const { _id } = req.params;
      // const response = await ServiceNote.deleteNote(_id);
      return new ReturnResponse(res, 200, 'Success', 'response');
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async updateNote(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      // const { _id } = req.params;
      // const body: iNote = req.body;
      // await ServiceNote.updateNote(_id, body);
      return new ReturnResponse(res, 204, 'Success', undefined);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
  static async loginNote(
    req: Request,
    res: Response
  ): Promise<ReturnResponse | ReturnError> {
    try {
      // const { userName, password } = req.body;
      // const response = await ServiceNote.loginNote(userName, password);
      return new ReturnResponse(res, 200, 'Success', 'response');
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
}
