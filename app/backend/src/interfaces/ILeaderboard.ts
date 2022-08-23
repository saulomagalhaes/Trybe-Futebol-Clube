export interface ITeamsRanking {
  name: string;
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export interface ILeaderboard {
  teamsRanking(team1:string, team2:string): Promise<ITeamsRanking[]>
  generalRanking(ranking:ITeamsRanking[]):ITeamsRanking[]
}
