/* eslint-disable @typescript-eslint/ban-types */

import {Request, Response} from 'express';

import { StatusCodes } from 'http-status-codes';

import {getAll} from '../../database/providers/customer';

export const GetAll = async( req: Request, res: Response): Promise<Response> => {
  try {
    const customers = await getAll();

    return res.status(StatusCodes.OK).json(customers);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error });
  }
};
