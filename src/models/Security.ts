

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import Declaration from './Declaration';
import Acquisition from './Acquisition';

const Security = sequelize.define(
  'Security',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registerOwner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificateNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfShares: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearlyInterest: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    natureOfShares: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentMarketValue: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    financeSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acquisitionId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Acquisition,
        key: 'id',
      },
    },
    declarationId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Declaration,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Security;