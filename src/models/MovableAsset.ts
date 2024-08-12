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
// import Acquisition from './Acquisition';

// interface MovableAssetCreationAttributes
//   extends Optional<MovableAssetAttributes, 'id'> {}

// @Table({ timestamps: true })
// class MovableAsset extends Model<
//   MovableAssetAttributes,
//   MovableAssetCreationAttributes
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
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   description?: string;

//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   registrationNo!: string;

//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   location!: string;

//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   purpose!: string;

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

// export default MovableAsset;

import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import Declaration from './Declaration';
import Acquisition from './Acquisition';

const MovableAsset = sequelize.define(
  'MovableAsset',
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registrationNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default MovableAsset;
