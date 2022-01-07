import * as express from 'express';
import User from '../models/user'

export class AuthController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'username': username, 'password': password }, (err, user) => {
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
        let user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type
        });

        user.save().then(user => {
            res.status(200).json({ 'message': 'user added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'error' });
        })
    }
}