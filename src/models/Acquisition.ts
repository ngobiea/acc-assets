// import { Optional } from 'sequelize';
// import {
//   DataType,
//   Table,
//   Model,
//   Column,
// } from 'sequelize-typescript';
// import { v4 as uuidv4 } from 'uuid';

// interface AcquisitionCreationAttributes
//   extends Optional<AcquisitionAttributes, 'id'> {}

// @Table({ timestamps: true })
// class Acquisition extends Model<
//   AcquisitionAttributes,
//   AcquisitionCreationAttributes
// > {
//   @Column({
//     allowNull: false,
//     unique: true,
//     primaryKey: true,
//     type: DataType.STRING,
//     defaultValue: uuidv4(),
//   })
//   id!: string;

//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   modeOfAcquisition!: string;

//   @Column({
//     allowNull: false,
//     type: DataType.DECIMAL(15, 2),
//   })
//   cost!: number;

//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   currency!: string;

//   @Column({
//     allowNull: false,
//     type: DataType.INTEGER,
//   })
//   yearOfAcquisition!: number;
// }

// export default Acquisition;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';

const Acquisition = sequelize.define('Acquisition', {
  id: {
    allowNull: false,
    unique: true,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: uuidv4(),
  },
  modeOfAcquisition: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cost: {
    allowNull: false,
    type: DataTypes.DECIMAL(15, 2),
  },
  currency: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  yearOfAcquisition: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

export default Acquisition;