import 'dotenv/config';
import Match from '../database/models/match';
import Team from '../database/models/team';
import { IHomeTeamsRanking, ILeaderboard } from '../interfaces/ILeaderboard';
import { IMatch } from '../interfaces/IMatchService';
// import ThrowError from '../error/throwError';

class LeaderboardService implements ILeaderboard {
  static getFinishedMatches = async (): Promise<IMatch[]> => {
    const matches = Match.findAll({
      where: { inProgress: false },
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

  static goalsData = (filteredTeam:IMatch[]) => {
    const goalsFavor = filteredTeam.reduce(
      (acc, t) => t.homeTeamGoals + acc,
      0,
    );
    const goalsOwn = filteredTeam.reduce(
      (acc, t) => t.awayTeamGoals + acc,
      0,
    );
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  };

  static matchDataEfficiencyAndPoints = (filteredTeam:IMatch[]) => {
    const totalGames = filteredTeam.length;
    const totalVictories = filteredTeam.filter(
      (t) => t.homeTeamGoals > t.awayTeamGoals,
    ).length;
    const totalDraws = filteredTeam.filter(
      (t) => t.homeTeamGoals === t.awayTeamGoals,
    ).length;
    const totalLosses = filteredTeam.filter(
      (t) => t.homeTeamGoals < t.awayTeamGoals,
    ).length;
    const totalPoints = totalVictories * 3 + totalDraws;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100)
      .toFixed(2)
      .toString();
    return { totalPoints, totalGames, totalVictories, totalDraws, totalLosses, efficiency };
  };

  static sortRanking = (ranking:IHomeTeamsRanking[]) => {
    const rankingSorted = ranking.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );
    return rankingSorted;
  };

  public homeTeamsRanking = async (): Promise<IHomeTeamsRanking[]> => {
    const matches = await LeaderboardService.getFinishedMatches();
    const homeTeamsRanking = matches.map((match) => {
      const filteredTeam = matches.filter((m) => m.homeTeam === match.homeTeam);
      const goals = LeaderboardService.goalsData(filteredTeam);
      const matchData = LeaderboardService.matchDataEfficiencyAndPoints(filteredTeam);
      return {
        name: match.teamHome?.teamName || '', ...matchData, ...goals };
    });

    const ranking = homeTeamsRanking.filter(
      (team, index, self) =>
        index === self.findIndex((t) => t.name === team.name),
    );
    return LeaderboardService.sortRanking(ranking);
  };
}

export default LeaderboardService;
