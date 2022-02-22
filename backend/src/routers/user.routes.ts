import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/get').get(
    (req, res) => new UserController().getUserById(req, res)
)

userRouter.route('/getUnregistered').get(
    (req, res) => new UserController().getUnregistered(req, res)
)

userRouter.route('/getAll').get(
    (req, res) => new UserController().getAll(req, res)
)

userRouter.route('/addToFavorites').post((req, res) => {
        new UserController().addToFavorites(req, res)
    }
)

userRouter.route('/removeFromFavorites').post(
    (req, res) => new UserController().removeFromFavorites(req, res)
)

userRouter.route('/accept').post(
    (req, res) => new UserController().acceptUser(req, res)
)

userRouter.route('/decline').post(
    (req, res) => new UserController().declineUser(req, res)
)

userRouter.route('/delete').post(
    (req, res) => new UserController().deleteUser(req, res)
)

userRouter.route('/update').post(
    (req, res) => new UserController().updateUser(req, res)
)

userRouter.route('/updateAdvertiser').post(
    (req, res) => new UserController().updateAdvertiser(req, res)
)

export default userRouter;