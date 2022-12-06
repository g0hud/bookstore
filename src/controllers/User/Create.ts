/* eslint-disable @typescript-eslint/ban-types */

import {Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';

import { create } from '../../database/providers/user';

interface IBodyProps {
  name: string;
  email: string;
  password: string;
}

export const Create = async( req: Request<{}, {}, IBodyProps>, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const newUser = await create(name, email, password);

    if(newUser.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: newUser.error });
    }

    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error });
  }
};
