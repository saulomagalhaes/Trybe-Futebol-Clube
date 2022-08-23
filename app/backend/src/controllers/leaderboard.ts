import { Request, Response } from 'express';
import 'express-async-errors';
import { ILeaderboard } from '../interfaces/ILeaderboard';

export default class LeaderboardController {
  constructor(private _leaderBoardService: ILeaderboard) {}

  public homeTeamsRanking = async (req: Request, res: Response): Promise<void> => {
    const ranking = await this._leaderBoardService.teamsRanking('homeTeam', 'awayTeam');
    res.status(200).json(ranking);
  };

  public awayTeamsRanking = async (req: Request, res: Response): Promise<void> => {
    const ranking = await this._leaderBoardService.teamsRanking('awayTeam', 'homeTeam');
    res.status(200).json(ranking);
  };

  public teamsRanking = async (req: Request, res: Response): Promise<void> => {
    const rankingHome = await this._leaderBoardService.teamsRanking('homeTeam', 'awayTeam');
    const rankingAway = await this._leaderBoardService.teamsRanking('awayTeam', 'homeTeam');
    const ranking = this._leaderBoardService.generalRanking([...rankingHome, ...rankingAway]);
    res.status(200).json(ranking);
  };
}
