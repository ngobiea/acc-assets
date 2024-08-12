// import { DataTypes } from 'sequelize';
// import sequelize from '.';
// import { v4 as uuidv4 } from 'uuid';
// import Declaration from './Declaration';

// interface EmploymentCreationAttributes
//   extends Optional<EmploymentAttributes, 'id'> {}

// @Table({ timestamps: true })
// class Employment extends Model<
//   EmploymentAttributes,
//   EmploymentCreationAttributes
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
//   status!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   mda!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   employeeCategory!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   posting!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   title!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   rank!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.DECIMAL(15, 2),
//   })
//   annualSalary!: number;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   currency!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.DECIMAL(15, 2),
//   })
//   allowance?: number;
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
//   SSNo?: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   employeeId!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   employeePin?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   establishmentRegNo?: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   contractType!: string;
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

// export default Employment;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import Declaration from './Declaration';

const Employment = sequelize.define(
  'Employment',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posting: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    annualSalary: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allowance: {
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
    SSNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeePin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    establishmentRegNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contractType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contractStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contractEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
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

export default Employment;
