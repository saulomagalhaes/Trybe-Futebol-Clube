import { Request, Response } from 'express';
import 'express-async-errors';
import { IUserService } from '../interfaces/IUserService';
import JoiService from '../services/joiService';

export default class UserController {
  constructor(private _userService: IUserService) { }

  public login = async (req: Request, res: Response): Promise<void> => {
    await JoiService.validateBodyLogin(req.body);
    const token = await this._userService.login(req.body);
    res.status(200).json({ token });
  };

  public validate = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization || '';
    const role = await this._userService.validate(token);
    res.status(200).json({ role });
  };
}
