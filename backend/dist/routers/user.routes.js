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
userRouter.route('/addToFavorites').post((req, res) => {
    new user_controller_1.UserController().addToFavorites(req, res);
});
userRouter.route('/removeFromFavorites').post((req, res) => {
    new user_controller_1.UserController().removeFromFavorites(req, res);
});
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map