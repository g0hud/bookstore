/* eslint-disable @typescript-eslint/ban-types */

import {Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProduct } from '../../database/models';

import { Destroy } from '../../database/providers/product';

interface IParamsProps extends Omit<IProduct,| 'created_at' | 'updated_at'> {}

export const DeleteProduct = async (request: Request<IParamsProps, {}, {}>, response: Response): Promise<Response> => {
  try {
    const { id } = request.params;

    const product = await Destroy(id);

    if (product instanceof Error) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        error: product.message,
      });
    }

    return response.status(StatusCodes.OK).json({ message: 'Product deleted' });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};
