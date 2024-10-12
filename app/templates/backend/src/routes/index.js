import express from 'express';
const router = express.Router();

import authRoute from './auth.js';

const routes = () => {
router.use('/', authRoute);
return router;
};

export default routes;