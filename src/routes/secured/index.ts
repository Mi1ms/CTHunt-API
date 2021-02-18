import { Router } from 'express';
import users from './users';
import notices from './notices';
import quests from './quests';

const routes = Router();
routes.use('/users', users);
routes.use('/comments', notices);
routes.use('/quests', quests);

export default routes;