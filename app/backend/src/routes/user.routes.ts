import { Router } from 'express';
import userController from '.';

const router = Router();

router.post('/', (req, res) => userController.login(req, res));

export default router;
