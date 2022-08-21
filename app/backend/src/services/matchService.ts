import 'dotenv/config';
import Match from '../database/models/match';
import Team from '../database/models/team';
import ThrowError from '../error/throwError';
import { IBodyMatch, IMatch, IMatchService } from '../interfaces/IMatchService';
import JwtService from './jwtService';

class MatchService implements IMatchService {
  static validateMatch = async (homeTeam:number, awayTeam:number):Promise<void> => {
    if (homeTeam === awayTeam) {
      throw new ThrowError(
        'UnauthorizedError',
        'It is not possible to create a match with two equal teams',
      );
    }
    const home = await Match.findByPk(homeTeam);
    const away = await Match.findByPk(awayTeam);

    if (!home || !away) {
      throw new ThrowError(
        'NotFound',
        'There is no team with such id!',
      );
    }
  };

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

  public saveMatch = async (
    token: string,
    match: IBodyMatch,
  ): Promise<IMatch> => {
    JwtService.verify(token, process.env.JWT_SECRET || '');

    const { homeTeam, awayTeam } = match;

    await MatchService.validateMatch(homeTeam, awayTeam);

    const newMatch = await Match.create({ ...match, inProgress: true });

    return newMatch;
  };

  public updateInProgress = async (matchId: string): Promise<object> => {
    await Match.update({ inProgress: false }, { where: { id: matchId } });
    return { message: 'Finished' };
  };
}

export default MatchService;
