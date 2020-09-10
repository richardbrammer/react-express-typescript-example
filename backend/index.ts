import express from 'express';
import usersRouter from './users/routes';
import sequelize from './db/sequelize';
import auth from './users/api';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3000;

sequelize.sync().then(() => {
    console.log('[backend]: Connected to DB');
});

app.use(session({ secret: 'Darth Vader is Luke Skywalker\'s father' }));
app.use(passport.initialize());
app.use(passport.session());
auth.setupPassport();

/**
 * parse application/json
 */
app.use(express.json());
app.use(cors());

/**
 * TODO add react app on root
 */
app.get('/', (req, res) => res.send(404));

/**
 * Return list of users as application/json
 * Publish API as V1 to be able to support legacy apps after breaking changes of the API
 */
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => {
  console.log(`[backend]: Server is running on https://localhost:${PORT}`);
});