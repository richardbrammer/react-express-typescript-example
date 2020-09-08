import bcrypt from 'bcrypt';

import { UserRegister } from '../interfaces/user-register.interface';
import { UserLogin } from '../interfaces/user-login.interface';
import { UserModel } from '../models/user.model';

import passport from 'passport';
import PassportLocal from 'passport-local';

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

const setupPassport = async () => {
    passport.use(new PassportLocal.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true
    }, async (email, password, done) => {
        const existingUser = await UserModel.findOne({ where: { email: email }});
        if (!existingUser) {
            return done(null, false);
            
        }   
    
        const passwordCorrect = bcrypt.compareSync(password, existingUser!.password);
        if (!passwordCorrect) {
            return done(null, false);
        }
        return done(null, existingUser);
    }));

    passport.serializeUser((user: UserModel, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id: number, done) => {
        UserModel.findByPk(id).then(user => {
            done(null, user);
        }).catch(err => {
            done(err, null);
        });
    });
}

const logoutUser = async () => {

};

export default {
    logoutUser,
    registerUser,
    setupPassport
}