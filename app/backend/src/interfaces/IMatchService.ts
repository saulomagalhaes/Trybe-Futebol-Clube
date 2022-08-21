export interface IBodyMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string;
  }
  teamAway?: {
    teamName: string;
  }
}

export interface IMatchService {
  getAll(): Promise<IMatch[]>;
  saveMatch(_token: string, match: IBodyMatch): Promise<IMatch>;
  updateInProgress(matchId: string): Promise<object>;
}
