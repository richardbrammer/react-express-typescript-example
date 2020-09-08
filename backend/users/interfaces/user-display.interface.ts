import { User } from './user.interface';

export interface UserDisplay extends User {
    id: number;
    fullname: string;
}