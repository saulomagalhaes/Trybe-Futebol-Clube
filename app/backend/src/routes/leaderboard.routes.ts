import { Router } from 'express';
import { leaderboardController } from '.';

const router = Router();

router.get('/home', (req, res) => leaderboardController.homeTeamsRanking(req, res));

export default router;
