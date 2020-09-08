import { UserRegister } from '../interfaces/user-register.interface';
import { UserLogin } from '../interfaces/user-login.interface';
import { UserModel } from '../models/user.model';

import bcrypt from 'bcrypt';

const registerUser = async (user: UserRegister) => {
    // TODO check rules
    
    const existingUser = await UserModel.findOne({ where: { email: user.email }});
    if (existingUser) {
        return 403;
    }
    
    /**
     * hash & update password
     */
    const password = bcrypt.hashSync(user.password, 10);
    user.password = password;
    
    await UserModel.create(user);
    return user.password;
};

const loginUser = async (user: UserLogin) => {
    const existingUser = await UserModel.findOne({ where: { email: user.email }});
    if (!existingUser) {
        return 403;
    }

    const passwordCorrect = bcrypt.compareSync(user.password, existingUser.password);
    if (!passwordCorrect) {
        return 403;
    }
    return user.email;
};

const logoutUser = async () => {

};

export default {
    registerUser,
    loginUser,
    logoutUser
}