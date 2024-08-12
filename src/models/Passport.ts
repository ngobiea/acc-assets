// import { Optional } from 'sequelize';
// import {
//   DataType,
//   Table,
//   Model,
//   Column,
//   BelongsTo,
//   ForeignKey,
// } from 'sequelize-typescript';
// import { v4 as uuidv4 } from 'uuid';
// import Contact from './Contact';
// import User from './User';

// interface PassportCreationAttributes
//   extends Optional<PassportAttributes, 'id'> {}

// @Table({ timestamps: true })
// class Passport extends Model<PassportAttributes, PassportCreationAttributes> {
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
//   passportNumber!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   issueDate!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.DATE,
//   })
//   expiryDate!: Date;

//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   issuingAuthority!: string;

//   @ForeignKey(() => User)
//   @Column({ allowNull: false, type: DataType.STRING })
//   userId!: string;

//   @BelongsTo(() => User)
//   user!: User;
// }

// export default Passport;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

const Passport = sequelize.define(
  'Passport',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    passportNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    issuingAuthority: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default Passport;
