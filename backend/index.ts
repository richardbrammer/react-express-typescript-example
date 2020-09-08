import express from 'express';
import usersRouter from './users/routes';
import sequelize from './db/sequelize';

const app = express();
const PORT = process.env.PORT ?? 3000;

sequelize.sync().then(() => {
    console.log('connected to DB');
});

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