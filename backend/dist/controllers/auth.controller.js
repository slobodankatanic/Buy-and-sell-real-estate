"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_1 = __importDefault(require("../models/user"));
class AuthController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, "status": "approved" }, (err, user) => {
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(400).json({
                        "message": "Wrong credentials"
                    });
                }
            });
        };
        this.register = (req, res) => {
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map