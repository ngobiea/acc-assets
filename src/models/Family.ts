// import { Optional } from 'sequelize';
// import {
//   DataType,
//   Table,
//   Model,
//   Column,
//   BelongsTo,
//   ForeignKey,
//   HasOne,
// } from 'sequelize-typescript';
// import { v4 as uuidv4 } from 'uuid';
// import Declaration from './Declaration';
// import  FamilyEmployment from './FamilyEmployment';

// interface FamilyCreationAttributes extends Optional<FamilyAttributes, 'id'> {}

// @Table({ timestamps: true })
// class Family extends Model<FamilyAttributes, FamilyCreationAttributes> {
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
//   surname!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   firstName!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   middleName?: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   relation!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   address!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.DATE,
//   })
//   dateOfBirth!: Date;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   gender!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   nationality?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   phoneNumber?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   email?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   mobile?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   businessName?: string;
//   @HasOne(() => FamilyEmployment)
//   employment!: FamilyEmployment;
//   @ForeignKey(() => Declaration)
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   declarationId!: string;

//   @BelongsTo(() => Declaration)
//   declaration!: Declaration;
// }

// export default Family;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import User from './User';
import Declaration from './Declaration';

const Family = sequelize.define(
  'Family',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true,
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

export default Family;