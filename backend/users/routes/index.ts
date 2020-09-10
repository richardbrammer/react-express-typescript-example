import express from 'express';
import api from '../api';
import passport from 'passport';
import { body, validationResult } from 'express-validator';

import { isAuthenticated } from '../../helpers/is-authenticated.helper';

const router = express.Router();

router.post('/register', [
    body('email')
        .isEmail().withMessage('Must be a valid email address')
        .isLength({ max: 256 }).withMessage('Maximum 256 characters')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('At least 8 characters')
        .matches(/.*(?=\w{1,}).*(?=\d{1,}).*/).withMessage('At least one number and one character'),
    body('fullname')
        .isLength({ min: 5, max: 512 }).withMessage('At least 5 characters and maximum 512 characters')
        .trim().escape()
], (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    api.registerUser(req.body).then(email => res.send(email)).catch(() => {
        res.send(500);
    });

});

router.post('/login', [
    body('email').normalizeEmail()
], passport.authenticate('local'), (req: any, res: any) => {
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