import Router from 'express'
import AuthController from '../controllers/auth_controller.js';
import authMiddleware from '../middlewares/auth_middleware.js';

const AuthRouter = new Router();

AuthRouter.post('/registration', AuthController.registration);
AuthRouter.post('/login', authMiddleware, AuthController.login);
AuthRouter.post('/logout', AuthController.logout);
AuthRouter.post('/refresh', AuthController.refresh);

export default AuthRouter;