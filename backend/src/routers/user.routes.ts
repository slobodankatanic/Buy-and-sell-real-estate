import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

export default userRouter;