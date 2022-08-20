import MathController from '../controllers/matchController';
import TeamController from '../controllers/teamController';
import UserController from '../controllers/userController';
import MatchService from '../services/matchService';
import TeamService from '../services/teamsService';
import UserService from '../services/userService';

const userService = new UserService();
const userController = new UserController(userService);

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const matchService = new MatchService();
const matchController = new MathController(matchService);

export { userController, teamController, matchController };
