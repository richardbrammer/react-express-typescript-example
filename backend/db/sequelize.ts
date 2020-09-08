import { Sequelize, DataTypes } from 'sequelize';
import { UserModel } from '../users/models/user.model';

const sequelize = new Sequelize(process.env.DATABASE_URL ?? 'postgres://username:password@postgres:PORT/db');

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(256)
    },
    fullname: {
        type: DataTypes.STRING(512)
    },
    password: {
        type: DataTypes.STRING(60)
    }
}, {
    sequelize,
    tableName: 'users'
});

export default sequelize;