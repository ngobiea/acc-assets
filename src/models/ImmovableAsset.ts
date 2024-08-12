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

// interface ImmovableAssetCreationAttributes
//   extends Optional<ImmovableAssetAttributes, 'id'> {}

// @Table({ timestamps: true })
// class ImmovableAsset extends Model<
//   ImmovableAssetAttributes,
//   ImmovableAssetCreationAttributes
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
//   assetType!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   location!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   PlotNo?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   size?: string;
//   @Column({
//     allowNull: false,
//     type: DataType.DECIMAL(15, 2),
//   })
//   estimatedValue!: number;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   currency!: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   financeSource!: string;
//   @ForeignKey(() => Acquisition)
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   acquisitionId!: string;
//   @BelongsTo(() => Acquisition)
//   acquisition?: Acquisition;
//   @ForeignKey(() => Declaration)
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   declarationId!: string;
//   @BelongsTo(() => Declaration)
//   declaration?: Declaration;
// }
// export default ImmovableAsset;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import Declaration from './Declaration';
import Acquisition from './Acquisition';

const ImmovableAsset = sequelize.define(
  'ImmovableAsset',
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
    assetType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PlotNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estimatedValue: {
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
      allowNull: true,
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

export default ImmovableAsset;
