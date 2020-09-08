import { UserRegister } from '../interfaces/user-register.interface';
import { UserLogin } from '../interfaces/user-login.interface';

const registerUser = (user: UserRegister) => {

}

const loginUser = (user: UserLogin) => {
    return 'login';
}

const logoutUser = () => {

}

export default {
    registerUser,
    loginUser,
    logoutUser
}