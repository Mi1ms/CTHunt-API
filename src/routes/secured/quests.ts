import { Router } from 'express';
import multer from 'multer';
import QuestController from '../../controllers/QuestController';

const upload = multer();
const routes = Router();

routes.post('/', upload.single('solution'), QuestController.save);
routes.get('/', QuestController.getAll);
routes.get('/:id', QuestController.getOneById);
routes.post('/verification', QuestController.verifySolution);

export default routes;
