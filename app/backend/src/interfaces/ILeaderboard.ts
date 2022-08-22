export interface IHomeTeamsRanking {
  name: string,
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
  homeTeamsRanking(): Promise<IHomeTeamsRanking[]>
}
