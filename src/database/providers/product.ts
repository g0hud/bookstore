
import { Knex } from '../../database/knex';
import { ETableNames } from '../ETableNames';

import { IProduct } from '../models';

export const Create = async(product: Omit<IProduct, 'id'>): Promise<number | Error> => {
  try {

    const [id] = await Knex(ETableNames.PRODUCTS).insert({
      title: product.title,
      synopsis: product.synopsis,
      author: product.author,
      cover: product.cover,
      category: product.category,
      language: product.language,
      publisher: product.publisher,
      pages: product.pages,
      isbn: product.isbn,
      stock: product.stock,

      price: product.price,

      created_at: product.created_at,
      updated_at: product.updated_at,
    });

    return id;

  } catch (error) {
    return new Error('Error to create product');
  }
};

export const Update = async(product: IProduct): Promise<boolean | Error> => {
  try {
    const { id } = product;

    const productExists = await Knex(ETableNames.PRODUCTS).where({ id }).first();

    if (!productExists) {
      return new Error('Product not found');
    }

    await Knex(ETableNames.PRODUCTS).where({ id }).update({
      title: product.title,
      synopsis: product.synopsis,
      author: product.author,
      cover: product.cover,
      category: product.category,
      language: product.language,
      publisher: product.publisher,
      pages: product.pages,
      isbn: product.isbn,
      stock: product.stock,

      price: product.price,

      available: product.available,

      updated_at: new Date(),
    });

    return true;

  } catch (error) {
    return new Error('Error to update product');
  }
};

export const Destroy = async(id: number): Promise<boolean | Error> => {
  try {

    const product = await Knex(ETableNames.PRODUCTS)
      .where('id', '=', id)
      .update({
        available: false,
        updated_at: new Date(),
      });

    return product > 0;

  } catch (error) {
    return new Error('Error to delete product');
  }
};
