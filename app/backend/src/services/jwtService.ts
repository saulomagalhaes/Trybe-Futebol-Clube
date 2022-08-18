import * as jwt from 'jsonwebtoken';

export default class JwtService {
  static sign = (payload: jwt.JwtPayload, secret: jwt.Secret, options: jwt.SignOptions) =>
    jwt.sign(payload, secret, options);
}
