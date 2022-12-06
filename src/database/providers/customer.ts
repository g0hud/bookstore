
import { Knex } from '../../database/knex';
import { getAddressByCEP } from '../../services/';
import { ETableNames } from '../ETableNames';

import { IAddress, IPhone, ICustomer } from '../models';

interface CustumerProps extends ICustomer {
  address: IAddress;
  phone: IPhone;
}

interface ResponseProps {
  id?: number;
  error?: string;
}

export const create = async (
  customer: Omit<ICustomer, 'id'>,
  address: Omit<IAddress, 'id' | 'customer_id'>,
  phone: Omit<IPhone, 'id'  | 'customer_id'>): Promise<ResponseProps> => {
  try {

    const [id] = await Knex(ETableNames.CUSTOMERS).insert({
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf
    });

    const getAddress = await getAddressByCEP(address.zip_code);

    const newAddress = {
      ...address,
      street: getAddress.logradouro,
      neighborhood: getAddress.bairro,
      city: getAddress.localidade,
      state: getAddress.uf,
    };

    await Knex(ETableNames.ADDRESS).insert({
      ...newAddress,
      customer_id: id,
    });

    await Knex(ETableNames.PHONES).insert({
      ...phone,
      customer_id: id,
    });

    return {
      id: id,
    };

  } catch (error) {
    return {
      error: 'Error to create customer',
    };
  }
};

export const getAll = async (): Promise<CustumerProps[]> => {
  try {
    const customers = await Knex(ETableNames.CUSTOMERS)
      .join(ETableNames.CUSTOMERS, 'customers.id', '=', 'addresses.customer_id')
      .join(ETableNames.PHONES, 'customers.id', '=', 'phones.customer_id')
      .select(
        'customers.id',
        'customers.name',
        'customers.email',
        'customers.cpf',

        'addresses.city',
        'addresses.state',
        'phones.number as phone_number',
      );

    return customers;
  } catch (error) {
    throw new Error('Erro ao buscar clientes');
  }
};

export const getByCPF = async (cpf: string): Promise<CustumerProps> => {
  try {
    const [customer] = await Knex(ETableNames.CUSTOMERS)
      .join(ETableNames.ADDRESS, 'customers.id', '=', 'addresses.customer_id')
      .join(ETableNames.PHONES, 'customers.id', '=', 'phones.customer_id')
      .where('customers.cpf', cpf)
      .select(
        'customers.id',
        'customers.name',
        'customers.email',
        'customers.cpf',

        'addresses.city',
        'addresses.state',
        'phones.number as phone_number',
      );

    return customer;
  } catch (error) {
    throw new Error('Erro ao buscar cliente');
  }
};
