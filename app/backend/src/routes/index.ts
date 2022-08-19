import TeamController from '../controllers/teamController';
import UserController from '../controllers/userController';
import TeamService from '../services/teamsService';
import UserService from '../services/userService';

const userService = new UserService();
const userController = new UserController(userService);

const teamService = new TeamService();
const teamController = new TeamController(teamService);

export { userController, teamController };
