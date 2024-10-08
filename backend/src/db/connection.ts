import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('dsw_agro_db', process.env.DB_USER || 'defaultUser', process.env.DB_PASSWORD || 'defaultPassword', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
