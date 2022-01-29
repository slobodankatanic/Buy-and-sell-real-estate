import * as express from 'express';
import User from '../models/user'

export class UserController {
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
                    } )
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