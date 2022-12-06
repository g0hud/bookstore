/* eslint-disable @typescript-eslint/ban-types */

import {Request, Response} from 'express';

import { StatusCodes } from 'http-status-codes';

import {create} from '../../database/providers/customer';
import { ICustomer, IAddress, IPhone } from '../../database/models';

interface IBodyProps {
  customer: Omit<ICustomer, 'id'>;
  address: Omit<IAddress, 'id' | 'customer_id'>;
  phone: Omit<IPhone, 'id' | 'customer_id'>;
}

export const Create = async( req: Request<{}, {}, IBodyProps>, res: Response): Promise<Response> => {
  try {
    const { customer, address, phone } = req.body;

    const newCustomer = await create(customer, address, phone);

    return res.status(StatusCodes.CREATED).json(newCustomer);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error });
  }
};

