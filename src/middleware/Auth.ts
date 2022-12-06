import { RequestHandler } from 'express';

import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';

export const Auth:RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Não autenticado' });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Não autenticado' });
    }

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Não autenticado' });
    }

    const jwtData = JWTService.verify(token);
    if(jwtData === 'JWT_SECRET_NOT_FOUND') {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Erro ao verificar token.' });
    }else if(jwtData === 'INVALID_TOKEN') {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Token inválido.' });
    }

    req.headers.idUsuario = jwtData.uid.toString();


    return next();
  }
  catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'User not authorized' });
  }
};
