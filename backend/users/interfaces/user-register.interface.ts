import { UserLogin } from './user-login.interface';

export interface UserRegister extends UserLogin {
    fullname: string;
}