import Match from '../database/models/match';
import Team from '../database/models/team';
import { IMatch, IMatchService } from '../interfaces/IMatchService';

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
}

export default MatchService;
