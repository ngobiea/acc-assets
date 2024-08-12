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
// import Declaration from './Declaration';

// interface LiabilitiesCreationAttributes
//   extends Optional<LiabilitiesAttributes, 'id'> {}

// @Table({ timestamps: true })
// class Liabilities extends Model<
//   LiabilitiesAttributes,
//   LiabilitiesCreationAttributes
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
//   debtorName!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   relation!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   creditor!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   creditorAddress!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.DECIMAL(15, 2),
//   })
//   loanAmount!: number;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   currency!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.INTEGER,
//   })
//   yearContracted?: number;
//   @Column({
//     allowNull: false,
//     type: DataType.INTEGER,
//   })
//   loanPurpose!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   loanRepayment!: string;

//   @Column({
//     allowNull: false,
//     type: DataType.DECIMAL(15, 2),
//   })
//   paymentPeriod!: number;
//   @Column({
//     allowNull: false,
//     type: DataType.DECIMAL(15, 2),
//   })
//   loanOutstanding!: number;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   currencyOutstanding!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.DATE,
//   })
//   maturityDate?: Date;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   remarks!: string;

//   @ForeignKey(() => Declaration)
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   declarationId!: string;
//   @BelongsTo(() => Declaration)
//   declaration?: Declaration;
// }

// export default Liabilities;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import Declaration from './Declaration';

const Liabilities = sequelize.define(
  'Liabilities',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    debtorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditorAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loanAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearContracted: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    loanPurpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loanRepayment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentPeriod: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    loanOutstanding: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    currencyOutstanding: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maturityDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    declarationId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Declaration,
        key: 'id',
      }
    },
  },
  {
    timestamps: true,
  }
);

export default Liabilities;