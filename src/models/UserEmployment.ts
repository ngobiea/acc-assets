

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

const UserEmployment = sequelize.define(
  'UserEmployment',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    mda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentPosting: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rankOrGrade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employeePin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    establishmentRegNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sourceOfIncome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdministrative: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isFinancial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isPolitical: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isProfessional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    },
  },
  {
    timestamps: true,
  }
);

export default UserEmployment;