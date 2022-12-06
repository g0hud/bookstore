
import { Knex } from '../knex';

import { PasswordCrypto } from '../../services';
import { ETableNames } from '../ETableNames';
import { IUser } from '../models';

interface ResponseProps {
  id?: number;
  error?: string;
}

export const create = async (
  name: string,
  email: string,
  password: string,
): Promise<ResponseProps> => {
  try {

    const passwordHash = await PasswordCrypto.hashPassword(password);

    if(name === '' || email === '' || password === '') {
      return { error: 'Dados inválidos' };
    }

    const [id] = await Knex(ETableNames.USERS).insert({
      name: name,
      email: email,
      password: passwordHash,
    });

    return {
      id: id,
    };
  } catch (error) {
    return {
      error: 'Error to create user',
    };
  }
};

export const findUserByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const user = await Knex(ETableNames.USERS)
      .select('*')
      .where('email', '=', email)
      .first();

    if(user) return user;

    return new Error('Usuário não encontrado');
  } catch (error) {
    return new Error('Usuário não encontrado');
  }
};
