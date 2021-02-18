import { Router } from 'express';
import ReviewController from '../../controllers/ReviewController';

const routes = Router();

routes.post('/', ReviewController.save);

export default routes;
