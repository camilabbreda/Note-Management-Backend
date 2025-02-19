import { Router, Express } from 'express';
import ControllerUser from '../domain/controller/controller-user';
import { authMiddleware } from '../common/util/auth/auth-middleware';
import ControllerNote from '../domain/controller/controller-note';
import ControllerLLM from '../domain/controller/controller-llm';

const router = Router();

router.get('/health', (_, res) => {
  res.status(200).send('I am alive');	
});

router.get('/user', ControllerUser.getAllUsers);
router.get('/user/:_id', ControllerUser.getUserById);
router.post('/user/register', ControllerUser.createUser);
router.post('/user/login', ControllerUser.loginUser);
router.put('/user/:_id', authMiddleware, ControllerUser.updateUser);
router.delete('/user/:_id', authMiddleware, ControllerUser.deleteUser);

router.get(
  '/note/user/:userId',
  authMiddleware,
  ControllerNote.getNotesByUserId,
);
router.get('/note', ControllerNote.getAllNotes);
router.get('/note/:_id', authMiddleware, ControllerNote.getNoteById);
router.post('/note', authMiddleware, ControllerNote.createNote);
router.put('/note/:_id', authMiddleware, ControllerNote.updateNote);
router.delete('/note/:_id', authMiddleware, ControllerNote.deleteNote);

router.post('/generate/note-title', ControllerLLM.generatNoteTitle);

export default (app: Express): void => {
  app.use(router);
};
