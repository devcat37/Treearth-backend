import Router from 'express'
import SpotController from '../controllers/spot_controller.js';
import authMiddleware from '../middlewares/auth_middleware.js';

const SpotRouter = new Router();

SpotRouter.post('/create', authMiddleware, SpotController.create);
SpotRouter.get('/getAll', authMiddleware, SpotController.getAll);
SpotRouter.get('/getInRadius', authMiddleware, SpotController.getInRadius);


export default SpotRouter;