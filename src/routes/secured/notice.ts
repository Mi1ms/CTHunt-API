import { Router } from 'express';
import NoticeController from '../../controllers/NoticeController';

const routes = Router();


routes.post('/', NoticeController.save);

export default routes;
