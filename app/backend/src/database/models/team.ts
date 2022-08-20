import { INTEGER, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
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

export default Team;
