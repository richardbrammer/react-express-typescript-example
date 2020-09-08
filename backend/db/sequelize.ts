import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://username:password@postgres:5432/db');
export default sequelize;