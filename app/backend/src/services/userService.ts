import 'dotenv/config';
import User from '../database/models/user';
import ThrowError from '../error/throwError';
import { ILogin, IUserService } from '../interfaces/IUserService';
import JwtService from './jwtService';
import PasswordService from './passwordService';

class UserService implements IUserService {
  static searchByEmail = async (email: string): Promise<User | null> => {
    const user: User | null = await User.findOne({
      where: { email },
      raw: true,
    });

    return user;
  };

  public login = async ({ email, password }:ILogin):Promise<string> => {
    const user: User | null = await UserService.searchByEmail(email);

    const unauthorizedError = new ThrowError('UnauthorizedError', 'Incorrect email or password');
    if (!user) {
      throw unauthorizedError;
    }
    if (!PasswordService.comparePassword(password, user.password)) {
      throw unauthorizedError;
    }
    const { id, role } = user;
    const payload = { data: id, role };
    const options = {
      expiresIn: '15d',
    };

    const token = JwtService.sign(payload, process.env.JWT_SECRET || '', options);

    return token;
  };
}

export default UserService;
