import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.route('/login').post(
    (req, res) => new AuthController().login(req, res)
)

export default authRouter;