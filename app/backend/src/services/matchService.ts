import 'dotenv/config';
import Match from '../database/models/match';
import Team from '../database/models/team';
import { IBodyMatch, IMatch, IMatchService } from '../interfaces/IMatchService';
import JwtService from './jwtService';

class MatchService implements IMatchService {
  public getAll = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  };

  public saveMatch = async (token: string, match: IBodyMatch): Promise<IMatch> => {
    JwtService.verify(token, process.env.JWT_SECRET || '');

    const newMatch = await Match.create({ ...match, inProgress: true });

    return newMatch;
  };
}

export default MatchService;
