import { Router } from 'express';
import reviews from './reviews';
import quests from './quests';

const routes = Router();
routes.use('/reviews', reviews);
routes.use('/quests', quests);

export default routes;
