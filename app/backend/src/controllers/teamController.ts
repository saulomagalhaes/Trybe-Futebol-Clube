import { Request, Response } from 'express';
import 'express-async-errors';
import { ITeamService } from '../interfaces/ITeamService';

export default class TeamController {
  constructor(private _teamService: ITeamService) {}

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const teams = await this._teamService.getAll();
    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    const team = await this._teamService.getById(req.params.id);
    res.status(200).json(team);
  };
}
