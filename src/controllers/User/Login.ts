/* eslint-disable @typescript-eslint/ban-types */

import {Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';

import { findUserByEmail } from '../../database/providers/user';
import { JWTService, PasswordCrypto } from '../../services';

interface IBodyProps {
  email: string;
  password: string;
}

interface ResponseProps extends Response {
  token?: string;
  error?: string;
}

export const Login = async( req: Request<{}, {}, IBodyProps>, res: Response): Promise<ResponseProps> => {
  const {  email, password } = req.body;

  const user = await findUserByEmail(email);

  if(user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Email ou senha inválidos' });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword( password, user.password );
  if(!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Email ou senha inválidos' });
  }

  const accessToken = JWTService.sign({ uid: user.id });
  if(accessToken === 'JWT_SECRET_NOT_FOUND') {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao gerar token.' });
  }

  return res.status(StatusCodes.OK).json({ accessToken });
};
