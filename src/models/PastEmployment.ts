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

// interface PastEmploymentCreationAttributes
//   extends Optional<PastEmploymentAttributes, 'id'> {}

// @Table({ timestamps: true })
// class PastEmployment extends Model<
//   PastEmploymentAttributes,
//   PastEmploymentCreationAttributes
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
//     type: DataType.BOOLEAN,
//   })
//   isPrivate!: boolean;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   employerName!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   titleOrDesignation!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   rankOrGrade?: string;
//   @Column({
//     allowNull: false,
//     type: DataType.DATE,
//   })
//   contractStartDate!: Date;
//   @Column({
//     allowNull: false,
//     type: DataType.DATE,
//   })
//   contractEndDate!: Date;
//   @Column({
//     allowNull: false,
//     type: DataType.DECIMAL(15, 2),
//   })
//   annualSalary!: number;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   salaryCurrency!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.DECIMAL(15, 2),
//   })
//   allowances?: number;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   allowancesCurrency?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   allowancesDescription?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   sourceOfIncome?: string;
//   @ForeignKey(() => Declaration)
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   declarationId!: string;

//   @BelongsTo(() => Declaration)
//   declaration!: Declaration;
// }

// export default PastEmployment;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import Declaration from './Declaration';

const PastEmployment = sequelize.define(
  'PastEmployment',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    employerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleOrDesignation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rankOrGrade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contractStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contractEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    annualSalary: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    salaryCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allowances: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    allowancesCurrency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allowancesDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sourceOfIncome: {
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

export default PastEmployment;

