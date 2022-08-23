import { Router } from 'express';
import { leaderboardController } from '.';

const router = Router();

router.get('/home', (req, res) => leaderboardController.homeTeamsRanking(req, res));
router.get('/away', (req, res) => leaderboardController.awayTeamsRanking(req, res));

export default router;
