import { Request, Response } from 'express';
import { ReturnResponse } from '../../common/dtos/return-response.dto';
import { ReturnError } from '../../common/dtos/return-error.dto';
import { iNote } from '../../common/interface/entity-note';
import ServiceLLM from '../service/service-llm';

export default class ControllerLLM {
  static async generatNoteTitle(
    req: Request,
    res: Response,
  ): Promise<ReturnResponse | ReturnError> {
    try {
      const body: iNote = req.body;
      const response = await ServiceLLM.generateTitle(body.content);
      return new ReturnResponse(res, 201, 'Success', response);
    } catch (error: any) {
      return new ReturnError(res, error);
    }
  }
}
