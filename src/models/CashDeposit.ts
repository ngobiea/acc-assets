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

// interface CashDepositCreationAttributes
//   extends Optional<CashDepositAttributes, 'id'> {}

// @Table({ timestamps: true })
// class CashDeposit extends Model<
//   CashDepositAttributes,
//   CashDepositCreationAttributes
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
//   ownerName!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   relation!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   registerOwner!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   AccountNo!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   type!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   institutionOrBank!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   location!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.DECIMAL(15, 2),
//   })
//   accountBalance!: number;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   currency!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   source!: string;
//   @ForeignKey(() => Declaration)
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   declarationId!: string;

//   @BelongsTo(() => Declaration)
//   declaration!: Declaration;
// }

// export default CashDeposit;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import Declaration from './Declaration';

const CashDeposit = sequelize.define(
  'CashDeposit',
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
    AccountNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institutionOrBank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountBalance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    declarationId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Declaration,
        key: 'id',
      }
    }
  },
  {
    timestamps: true,
  }
);

export default CashDeposit;
