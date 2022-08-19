import Team from '../database/models/team';
import ThrowError from '../error/throwError';
import { ITeam, ITeamService } from '../interfaces/ITeamService';

class TeamService implements ITeamService {
  public getAll = async (): Promise<ITeam[]> => {
    const teams: Team[] = await Team.findAll({
      raw: true,
    });

    return teams;
  };

  public getById = async (id: string): Promise<Team | null> => {
    const team: Team | null = await Team.findOne({
      where: { id },
      raw: true,
    });

    const notFound = new ThrowError('NotFound', 'team not found');

    if (!team) {
      throw notFound;
    }

    return team;
  };
}

export default TeamService;
