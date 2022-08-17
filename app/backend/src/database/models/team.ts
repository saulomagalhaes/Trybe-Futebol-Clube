import { INTEGER, Model } from 'sequelize';
import db from '.';
import Match from './match';

class Team extends Model {
  id!: number;
  email!: string;
  passwordHash!: string;
  name!: string;
  phone!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

Team.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'home_team', as: 'matchHome' });
Team.hasMany(Match, { foreignKey: 'away_team', as: 'matchAway' });

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'TeamAway' });

export default Team;
