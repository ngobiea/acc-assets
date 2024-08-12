
import { v4 as uuidv4 } from 'uuid';
import sequelize from '.';
import { DataTypes } from 'sequelize';
import User from './User';
const Session = sequelize.define(
  'Session',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    }
  },
  {
    timestamps: false,
    tableName: 'sessions',
  }
);

export default Session;