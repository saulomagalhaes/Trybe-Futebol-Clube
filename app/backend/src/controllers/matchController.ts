import { Request, Response } from 'express';
import { IMatch, IMatchService } from '../interfaces/IMatchService';

export default class MathController {
  constructor(private _matchService: IMatchService) {}

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    let matches: IMatch[];

    if (inProgress) {
      const query = inProgress === 'true';
      matches = await this._matchService.filterMatchesInProgress(query);
    } else {
      matches = await this._matchService.getAll();
    }
    res.status(200).json(matches);
  };

  public saveMatch = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization || '';
    const match = await this._matchService.saveMatch(token, req.body);
    res.status(201).json(match);
  };

  public updateInProgress = async (req: Request, res: Response): Promise<void> => {
    const matchId = req.params.id;
    const match = await this._matchService.updateInProgress(matchId);
    res.status(200).json(match);
  };

  public updateMatch = async (req: Request, res: Response): Promise<void> => {
    const matchId = req.params.id;
    const match = await this._matchService.updateMatch(matchId, req.body);
    res.status(200).json(match);
  };
}
