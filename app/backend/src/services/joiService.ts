import * as Joi from 'joi';
import { ILogin } from '../interfaces/IUserService';

export default class JoiService {
  static validateBodyLogin = async (userData: ILogin): Promise<ILogin> => {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.empty': 'All fields must be filled',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'All fields must be filled',
      }),
    });
    const data = await schema.validateAsync(userData);
    return data;
  };
}
