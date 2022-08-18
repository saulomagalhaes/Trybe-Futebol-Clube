import * as bcrypt from 'bcryptjs';

export default class PasswordService {
  // async hashPassword(password: string): Promise<string> {
  //   return bcrypt.hash(password, 10);
  // }

  static comparePassword = (password: string, hash: string): boolean =>
    bcrypt.compareSync(password, hash);
}
