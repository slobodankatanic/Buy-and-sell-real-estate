"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const realestate_1 = __importDefault(require("../models/realestate"));
class UserController {
    constructor() {
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ "username": username }, (err) => {
                realestate_1.default.updateMany({ "advertiserId": username }, { $set: { "sold": 1 } }, (err, re) => {
                    res.json({ "message": "ok" });
                });
            });
        };
        this.updateAdvertiser = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            let phone = req.body.phone;
            let agency = req.body.agency;
            let licence = req.body.licence;
            let type = "agent";
            if (agency == "") {
                type = "owner";
            }
            let phoneRegex = /^\+{0,1}381[0-9]{8,9}$/;
            let regexEmail = /^[A-Za-z0-9]+([\.]{0,1}[A-Za-z0-9_]+)*@[a-z]+(\.[a-z]{2,})*\.[a-z]{2,3}$/;
            if (!phoneRegex.test(phone)) {
                res.json({
                    "message": "Wrong format",
                    "status": 1
                });
            }
            else if (!regexEmail.test(email)) {
                res.json({
                    "message": "Wrong format",
                    "status": 2
                });
            }
            else {
                user_1.default.updateOne({ "username": username }, {
                    $set: {
                        "email": email, "telephone": phone, "agencyId": agency,
                        "licence": licence, "type": type
                    }
                }, (err, user) => {
                    res.json({ "message": "ok", "status": 0, "user": user });
                });
            }
        };
        this.updateUser = (req, res) => {
            let username = req.body.username;
            let newDOB = req.body.dob;
            let newPhone = req.body.phone;
            let phoneRegex = /^\+{0,1}381[0-9]{8,9}$/;
            if (newDOB == "") {
                res.status(400).json({
                    "message": "Required field",
                    "status": 2
                });
            }
            else if (!phoneRegex.test(newPhone)) {
                res.status(400).json({
                    "message": "Wrong format",
                    "status": 1
                });
            }
            else {
                user_1.default.updateOne({ "username": username }, { $set: { "dob": newDOB, "telephone": newPhone } }, (err, user) => {
                    res.status(200).json({ "message": "ok" });
                });
            }
        };
        this.acceptUser = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ "username": username }, { $set: { "status": "approved" } }, (err, user) => {
                res.json({ "msg": "ok" });
            });
        };
        this.declineUser = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ "username": username }, (err) => {
                res.json({ "msg": "ok" });
            });
        };
        this.getAll = (req, res) => {
            user_1.default.find({ "status": "approved", "type": { $in: ["owner", "buyer", "agent"] } }, (err, users) => {
                res.json(users);
            });
        };
        this.getUnregistered = (req, res) => {
            user_1.default.find({ "status": "awaiting" }, (err, users) => {
                res.json(users);
            });
        };
        this.removeFromFavorites = (req, res) => {
            let username = req.body.username;
            let realEstateId = Number(req.body.realEstateId);
            user_1.default.updateOne({ "username": username }, { $pull: { "favorites": realEstateId } }, (err, user) => {
                res.json({
                    "message": "Successfully removed from favorites!"
                });
            });
        };
        this.addToFavorites = (req, res) => {
            let username = req.body.username;
            let realEstateId = Number(req.body.realEstateId);
            user_1.default.findOne({ "username": username }, (err, user) => {
                if (user.get('favorites').length < 3) {
                    user_1.default.updateOne({ "username": username }, { $push: { "favorites": realEstateId } }, (err, user) => {
                        res.json({
                            "message": "Successfully added to favorites"
                        });
                    });
                }
                else {
                    res.json({
                        "message": "You can't add more favorite real estates"
                    });
                }
            });
        };
        this.getUserById = (req, res) => {
            let username = req.query.username;
            user_1.default.findOne({ "username": username }, (err, user) => {
                res.json(user);
            });
        };
        this.changePassword = (req, res) => {
            let currentPassword = req.body.currentPassword;
            let newPassword = req.body.newPassword;
            let confirmPassword = req.body.confirmPassword;
            let username = req.body.username;
            user_1.default.findOne({ "username": username, "password": currentPassword }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    if (currentPassword == newPassword) {
                        res.json({
                            "msg": "New password must be different from current password",
                            "status": 1
                        });
                    }
                    else if (newPassword != confirmPassword) {
                        res.json({
                            "msg": "You must confirm your password",
                            "status": 2
                        });
                    }
                    else {
                        user_1.default.updateOne({ "username": username }, { $set: { "password": newPassword } }, (err, user) => {
                            if (err) {
                                console.log(err);
                            }
                            if (user) {
                                res.status(200).json({
                                    "msg": "Password changed successfully",
                                    "status": 0
                                });
                            }
                        });
                    }
                }
                else {
                    res.json({
                        "msg": "You must enter your current password",
                        "status": 3
                    });
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map