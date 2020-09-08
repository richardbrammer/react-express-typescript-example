import express from 'express';
import api from '../api';
import passport from 'passport';

import { isAuthenticated } from '../../helpers/is-authenticated.helper';

const router = express.Router();

router.post('/register', (req, res) => {
    api.registerUser(req.body).then(email => res.send(email)).catch(() => {
        res.send(500);
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
});

router.post('/logout', (req, res) => {
    req.logout();
    res.send(200);
});

router.get('/current', isAuthenticated, (req, res) => {
    res.send(req.user);
});

export default router;