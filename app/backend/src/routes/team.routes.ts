import { Router } from 'express';
import { teamController } from '.';

const router = Router();

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
