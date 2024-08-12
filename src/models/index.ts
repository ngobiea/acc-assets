import { Sequelize } from 'sequelize';

//@ts-ignore
import pg from 'pg';
const {
  DB_NAME_LOCAL,
  DB_DIALECT_LOCAL,
  DB_PASSWORD_LOCAL,
  DB_USERNAME_LOCAL,
  DB_HOST_LOCAL,
  DB_PORT,
} = process.env;

const sequelize = new Sequelize({
  database: DB_NAME_LOCAL,
  dialect: 'postgres',
  password: DB_PASSWORD_LOCAL,
  username: DB_USERNAME_LOCAL,
  host: DB_HOST_LOCAL,
  // logging: (sql): void => {
  //   console.log(sql);
  // },
  dialectModule: pg,
  ssl: true,
  dialectOptions: {
    // ssl: {
    // require: true,
    // rejectUnauthorized: false,
    // },
  },
});


export const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      force: false,
      // alter: true,
    });
  } catch (error) {
    throw error;
  }
};

export default sequelize;
