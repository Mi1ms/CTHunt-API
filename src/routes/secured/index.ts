import { Router } from 'express';
import users from './users';
import notice from './notice';

const routes = Router();
routes.use('/users', users);
routes.use('/comment', notice);

export default routes;
