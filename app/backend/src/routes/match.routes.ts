import { Router } from 'express';
import { matchController } from '.';

const router = Router();

router.get('/', (req, res) => matchController.getAll(req, res));
router.post('/', (req, res) => matchController.saveMatch(req, res));
router.patch('/:id/finish', (req, res) => matchController.updateInProgress(req, res));
router.patch('/:id', (req, res) => matchController.updateMatch(req, res));
export default router;
