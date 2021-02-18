import { Router } from 'express';
import QuestController from '../../controllers/QuestController';

const routes = Router();

routes.get('/', QuestController.getAll);
routes.get('/:id', QuestController.getOneById);
routes.post('/', QuestController.save);
routes.post('/verification', QuestController.verifySolution);

export default routes;
