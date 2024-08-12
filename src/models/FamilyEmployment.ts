// import { DataTypes } from 'sequelize';
// import sequelize from '.';
// import { v4 as uuidv4 } from 'uuid';
// import Family from './Family';

// interface FamilyEmploymentCreationAttributes
//   extends Optional<FamilyEmploymentAttributes, 'id'> {}

// @Table({ timestamps: true })
// class FamilyEmployment extends Model<
//   FamilyEmploymentAttributes,
//   FamilyEmploymentCreationAttributes
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
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   employeeNo?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   employeeCategory?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   category?: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   institution!: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   SSNo?: string;
//   @Column({
//     allowNull: true,
//     type: DataType.STRING,
//   })
//   pinCode?: string;
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   designation!: string;
//   @ForeignKey(() => Family)
//   @Column({
//     allowNull: false,
//     type: DataType.STRING,
//   })
//   familyId!: string;
//   @BelongsTo(() => Family)
//   family!: Family;
// }
// export default FamilyEmployment;
import { DataTypes } from 'sequelize';
import sequelize from '.';
import { v4 as uuidv4 } from 'uuid';
import Family from './Family';
const FamilyEmployment = sequelize.define(
  'FamilyEmployment',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    employeeNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employeeCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SSNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    familyId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Family,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default FamilyEmployment;
