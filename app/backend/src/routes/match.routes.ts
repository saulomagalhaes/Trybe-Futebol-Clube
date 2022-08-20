import { Router } from 'express';
import { matchController } from '.';

const router = Router();

router.get('/', (req, res) => matchController.getAll(req, res));

export default router;
