import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

const Contact = sequelize.define(
  'Contact',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permanentAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentDistrict: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    presentAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    presentDistrict: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationalId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Contact;