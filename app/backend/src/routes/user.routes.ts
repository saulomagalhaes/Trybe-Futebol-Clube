import { Router } from 'express';
import { userController } from '.';

const router = Router();

router.get('/validate', (req, res) => userController.validate(req, res));
router.post('/', (req, res) => userController.login(req, res));

export default router;
