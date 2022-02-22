"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/get').get((req, res) => new user_controller_1.UserController().getUserById(req, res));
userRouter.route('/getUnregistered').get((req, res) => new user_controller_1.UserController().getUnregistered(req, res));
userRouter.route('/getAll').get((req, res) => new user_controller_1.UserController().getAll(req, res));
userRouter.route('/addToFavorites').post((req, res) => {
    new user_controller_1.UserController().addToFavorites(req, res);
});
userRouter.route('/removeFromFavorites').post((req, res) => new user_controller_1.UserController().removeFromFavorites(req, res));
userRouter.route('/accept').post((req, res) => new user_controller_1.UserController().acceptUser(req, res));
userRouter.route('/decline').post((req, res) => new user_controller_1.UserController().declineUser(req, res));
userRouter.route('/delete').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/update').post((req, res) => new user_controller_1.UserController().updateUser(req, res));
userRouter.route('/updateAdvertiser').post((req, res) => new user_controller_1.UserController().updateAdvertiser(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map