import * as express from 'express';
import User from '../models/user'
import RealEstate from '../models/realestate'

export class UserController {
    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.deleteOne({ "username": username }, (err) => {
            RealEstate.updateMany({ "advertiserId": username }, { $set: { "sold": 1 } }, (err, re) => {
                res.json({ "message": "ok" });
            })
        })
    }

    updateUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let newDOB = req.body.dob;
        let newPhone = req.body.phone;

        let phoneRegex = /^\+{0,1}381[0-9]{8,9}$/;

        if (newDOB == "") {
            res.status(400).json({
                "message": "Required field",
                "status": 2
            })
        } else if (!phoneRegex.test(newPhone)) {
            res.status(400).json({
                "message": "Wrong format",
                "status": 1
            })
        } else {
            User.updateOne({ "username": username },
                { $set: { "dob": newDOB, "telephone": newPhone } }, (err, user) => {
                    res.status(200).json({ "message": "ok" });
                })
        }
    }

    acceptUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.updateOne({ "username": username }, { $set: { "status": "approved" } }, (err, user) => {
            res.json({ "msg": "ok" });
        })
    }

    declineUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.deleteOne({ "username": username }, (err) => {
            res.json({ "msg": "ok" });
        })
    }

    getAll = (req: express.Request, res: express.Response) => {
        User.find({ "status": "approved", "type": { $in: ["owner", "buyer", "agent"] } }, (err, users) => {
            res.json(users);
        })
    }

    getUnregistered = (req: express.Request, res: express.Response) => {
        User.find({ "status": "awaiting" }, (err, users) => {
            res.json(users);
        })
    }

    removeFromFavorites = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let realEstateId = Number(req.body.realEstateId);

        User.updateOne(
            { "username": username },
            { $pull: { "favorites": realEstateId } }, (err, user) => {
                res.json({
                    "message": "Successfully removed from favorites!"
                });
            })
    }

    addToFavorites = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let realEstateId = Number(req.body.realEstateId);

        User.findOne({ "username": username }, (err, user) => {
            if (user.get('favorites').length < 3) {
                User.updateOne(
                    { "username": username },
                    { $push: { "favorites": realEstateId } },
                    (err, user) => {
                        res.json({
                            "message": "Successfully added to favorites"
                        });
                    })
            } else {
                res.json({
                    "message": "You can't add more favorite real estates"
                });
            }
        })
    }

    getUserById = (req: express.Request, res: express.Response) => {
        let username = req.query.username;

        User.findOne({ "username": username }, (err, user) => {
            res.json(user);
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let currentPassword = req.body.currentPassword;
        let newPassword = req.body.newPassword;
        let confirmPassword = req.body.confirmPassword;
        let username = req.body.username;

        User.findOne({ "username": username, "password": currentPassword }, (err, user) => {
            if (err) {
                console.log(err);
            }

            if (user) {
                if (currentPassword == newPassword) {
                    res.json({
                        "msg": "New password must be different from current password",
                        "status": 1
                    });
                } else if (newPassword != confirmPassword) {
                    res.json({
                        "msg": "You must confirm your password",
                        "status": 2
                    })
                } else {
                    User.updateOne({ "username": username }, { $set: { "password": newPassword } }, (err, user) => {
                        if (err) {
                            console.log(err);
                        }

                        if (user) {
                            res.status(200).json({
                                "msg": "Password changed successfully",
                                "status": 0
                            });
                        }
                    })
                }
            } else {
                res.json({
                    "msg": "You must enter your current password",
                    "status": 3
                })
            }
        })
    }

}