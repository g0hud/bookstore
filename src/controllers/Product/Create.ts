/* eslint-disable @typescript-eslint/ban-types */

import {Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProduct } from '../../database/models';

import { Create } from '../../database/providers/product';

interface IBodyProps extends Omit<IProduct, 'id' | 'created_at' | 'updated_at'> {}

export const CreateProduct = async (request: Request<{}, {}, IBodyProps>, response: Response): Promise<Response> => {
  try {
    const {
      title, synopsis, author, cover, category, language, publisher, pages, isbn,
      stock, price, available } = request.body;

    const product = await Create({
      title,
      synopsis,
      author,
      cover,
      category,
      language,
      publisher,
      pages,
      isbn,
      stock,

      price,
      available,

      created_at: new Date(),
      updated_at: new Date(),
    });

    if (product instanceof Error) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        error: product.message,
      });
    }

    return response.status(StatusCodes.CREATED).json({ id: product });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};
