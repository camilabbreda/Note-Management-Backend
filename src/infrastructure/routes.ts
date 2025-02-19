import { Router, Express } from 'express';
import ControllerUser from '../domain/controller/controller-user';
import { authMiddleware } from '../common/util/auth/auth-middleware';
import ControllerNote from '../domain/controller/controller-note';

const router = Router();

router.get('/user', authMiddleware, ControllerUser.getAllUsers);
router.get('/user/:_id', authMiddleware, ControllerUser.getUserById);
router.post('/user/register', ControllerUser.createUser);
router.post('/user/login', ControllerUser.loginUser);
router.put('/user/:_id', authMiddleware, ControllerUser.updateUser);
router.delete('/user/:_id', authMiddleware, ControllerUser.deleteUser);

router.get(
  '/note/user/:userId',
  authMiddleware,
  ControllerNote.getNotesByUserId,
);
router.get('/note', authMiddleware, ControllerNote.getAllNotes);
router.get('/note/:_id', authMiddleware, ControllerNote.getNoteById);
router.post('/note', authMiddleware, ControllerNote.createNote);
router.put('/note/:_id', authMiddleware, ControllerNote.updateNote);
router.delete('/note/:_id', authMiddleware, ControllerNote.deleteNote);

export default (app: Express): void => {
  app.use(router);
};
