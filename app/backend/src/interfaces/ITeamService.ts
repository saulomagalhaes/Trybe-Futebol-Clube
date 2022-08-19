export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAll(): Promise<ITeam[]>;
  getById(id: string): Promise<ITeam | null>;
}
