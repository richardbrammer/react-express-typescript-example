import { Model } from 'sequelize';

export class UserModel extends Model {
    public id!: number;
    public email!: string;
    public fullname!: string;
    public password!: string; // bcrypted
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
