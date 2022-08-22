export const matchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    home_team: 16,
    away_team: 8,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    home_team: 9,
    away_team: 14,
    teamHome: {
      teamName: "Internacional",
    },
    teamAway: {
      teamName: "Santos",
    },
  },
];

export const bodySaveMatch = {
  "homeTeam": 1, 
  "awayTeam": 16, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

export const returnSaveMatch = {
	"id": 49,
	"homeTeam": 1,
	"awayTeam": 16,
	"homeTeamGoals": 2,
	"awayTeamGoals": 2,
	"inProgress": true
}

export const bodyUnauSaveMatch = {
  "homeTeam": 16, 
  "awayTeam": 16, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

export const updateScore = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}