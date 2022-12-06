import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { getByCPF } from '../../database/providers/customer';

export const GetOneByCPF = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cpf } = req.params;

    const customer = await getByCPF(cpf);

    return res.status(StatusCodes.OK).json(customer);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error });
  }
};
