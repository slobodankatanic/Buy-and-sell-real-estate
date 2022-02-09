import * as express from 'express';
import User from '../models/user'

export class AuthController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'username': username, 'password': password, "status": "approved" }, (err, user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(400).json({
                    "message": "Wrong credentials"
                });
            }
        })
    }

    register = (req: express.Request, res: express.Response) => {

    }
}