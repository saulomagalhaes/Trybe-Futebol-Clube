import UserController from '../controllers/userController';
import UserService from '../services/userService';

const userService = new UserService();
const userController = new UserController(userService);

export default userController;
