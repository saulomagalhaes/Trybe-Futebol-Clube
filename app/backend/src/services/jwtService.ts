import * as jwt from 'jsonwebtoken';
import ICustomJwtPayload from '../interfaces/ICustomJwtPayload';

export default class JwtService {
  static sign = (payload: jwt.JwtPayload, secret: jwt.Secret, options: jwt.SignOptions) =>
    jwt.sign(payload, secret, options);

  static verify = (token: string, secret: jwt.Secret) => {
    const { data: { role } } = jwt.verify(token, secret) as ICustomJwtPayload;
    return role;
  };
}
