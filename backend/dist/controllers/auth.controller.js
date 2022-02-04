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
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
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
            let user = new user_1.default({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                type: req.body.type,
                city: req.body.city,
                dob: req.body.dateOfBirth,
                telephone: req.body.telephone,
                email: req.body.email,
                agencyId: Number(req.body.agencyId),
                licence: Number(req.body.agencyId),
                status: "awaiting",
                image: "http://localhost:4000/images/users/__img__" + req.file.originalname,
                favorites: []
            });
            user.save().then(user => {
                res.status(200).json({ 'message': 'user added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map