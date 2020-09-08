import { User } from './user.interface';

export interface UserLogin extends User {
    password: string;
}