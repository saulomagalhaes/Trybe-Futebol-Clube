import { Request, Response } from 'express';
import 'express-async-errors';
import { ILeaderboard } from '../interfaces/ILeaderboard';

export default class LeaderboardController {
  constructor(private _matchService: ILeaderboard) {}

  public homeTeamsRanking = async (req: Request, res: Response): Promise<void> => {
    const matches = await this._matchService.homeTeamsRanking();
    res.status(200).json(matches);
  };
}
