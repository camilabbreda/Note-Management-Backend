import { Router, Express } from 'express';
import ControllerUser from '../domain/controller/controller-user';
import { authMiddleware } from '../common/util/auth/auth-middleware';

const router = Router();

router.post('/user/register',  ControllerUser.createUser);
router.post('/user/login', ControllerUser.loginUser);
router.get('/user', ControllerUser.getAllUsers);
router.get('/user/:id', ControllerUser.getUserById);
router.delete('/user/register/:id', authMiddleware,ControllerUser.deleteUser);
router.put('/user/register/:id', authMiddleware,ControllerUser.updateUser);



export default (app: Express): void => {
  app.use(router);
};
