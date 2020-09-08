import express from 'express';
import api from '../api';
import { UserLogin } from '../interfaces/user-login.interface';

const router = express.Router();

router.post('/register', (req, res) => {
    api.registerUser(req.body).then(email => res.send(email)).catch(() => {
        res.send(500);
    });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    const body: UserLogin = req.body;
    api.loginUser(body).then(user => res.send(user));
    
});

router.post('/logout', (req, res) => {

});

export default router;