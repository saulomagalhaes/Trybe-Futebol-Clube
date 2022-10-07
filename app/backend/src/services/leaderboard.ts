import 'dotenv/config';
import Match from '../database/models/match';
import Team from '../database/models/team';
import { ILeaderboard, ITeamsRanking } from '../interfaces/ILeaderboard';
import { IMatch } from '../interfaces/IMatchService';

type homeOrAwayTeam = keyof IMatch;
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

  static goalsData = (filteredTeam:IMatch[], t1:homeOrAwayTeam) => {
    const goalsFavor = filteredTeam.reduce(
      (acc, t) => (t1 === 'homeTeam' ? t.homeTeamGoals + acc : t.awayTeamGoals + acc),
      0,
    );
    const goalsOwn = filteredTeam.reduce(
      (acc, t) => (t1 === 'homeTeam' ? t.awayTeamGoals + acc : t.homeTeamGoals + acc),
      0,
    );
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  };

  static matchDataEfficiencyAndPoints = (filteredTeam:IMatch[], t1:homeOrAwayTeam, t2:homeOrAwayTeam) => {
    const team1 = t1 === 'homeTeam' ? 'homeTeamGoals' : 'awayTeamGoals';
    const team2 = t2 === 'awayTeam' ? 'awayTeamGoals' : 'homeTeamGoals';

    const totalGames = filteredTeam.length;
    const totalVictories = filteredTeam.filter(
      (t) => t[team1] > t[team2],
    ).length;
    const totalDraws = filteredTeam.filter(
      (t) => t[team1] === t[team2],
    ).length;
    const totalLosses = filteredTeam.filter(
      (t) => t[team1] < t[team2],
    ).length;
    const totalPoints = totalVictories * 3 + totalDraws;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100)
      .toFixed(2)
      .toString();
    return { totalPoints, totalGames, totalVictories, totalDraws, totalLosses, efficiency };
  };

  static sortRanking = (ranking:ITeamsRanking[]) => {
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

  public teamsRanking = async (t1:homeOrAwayTeam, t2:homeOrAwayTeam): Promise<ITeamsRanking[]> => {
    const matches = await LeaderboardService.getFinishedMatches();
    const homeTeamsRanking = matches.map((match) => {
      const filteredTeam = matches.filter((m) => m[t1] === match[t1]);
      const goals = LeaderboardService.goalsData(filteredTeam, t1);
      const matchData = LeaderboardService.matchDataEfficiencyAndPoints(filteredTeam, t1, t2);
      const isT1Home = t1 === 'homeTeam' ? 'teamHome' : 'teamAway';
      return {
        name: match[isT1Home]?.teamName || '', ...matchData, ...goals };
    });

    const ranking = homeTeamsRanking.filter(
      (team, index, self) =>
        index === self.findIndex((t) => t.name === team.name),
    );
    return LeaderboardService.sortRanking(ranking);
  };

  public generalRanking = (duplicateRanking:ITeamsRanking[]) => {
    const normalizedRanking:ITeamsRanking[] = [];
    duplicateRanking.forEach((team) => {
      const obj = normalizedRanking.find((t) => t.name === team.name);
      if (obj) {
        obj.totalPoints += team.totalPoints;
        obj.totalGames += team.totalGames;
        obj.totalVictories += team.totalVictories;
        obj.totalDraws += team.totalDraws;
        obj.totalLosses += team.totalLosses;
        obj.goalsFavor += team.goalsFavor;
        obj.goalsOwn += team.goalsOwn;
        obj.goalsBalance += team.goalsBalance;
        obj.efficiency = ((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2).toString();
      } else {
        normalizedRanking.push(team);
      }
    });
    return LeaderboardService.sortRanking(normalizedRanking);
  };
}

export default LeaderboardService;
