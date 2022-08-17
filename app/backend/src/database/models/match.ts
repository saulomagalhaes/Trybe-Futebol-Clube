import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';

class Match extends Model {
  id!: number;
  email!: string;
  passwordHash!: string;
  name!: string;
  phone!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

export default Match;
