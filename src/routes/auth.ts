import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const routes = Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.post('/reset-password', AuthController.resetPassword);
routes.post('/change-password/:token', AuthController.changePassword);
routes.post('/confirmation/:emailToken', AuthController.confirmAccount);

export default routes;
