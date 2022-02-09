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
        User.find({ username: req.body.username }, (err, user) => {
            if (user) {
                res.json({
                    'message': 'username exists',
                    'status': 1
                });
            } else {
                User.find({ email: req.body.email }, (err, user) => {
                    if (user) {
                        res.json({
                            'message': 'email exists',
                            'status': 2
                        })
                    } else {
                        let user = new User({
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
                            licence: Number(req.body.licence),
                            status: "awaiting",
                            image: "http://localhost:4000/images/users/__img__" + req.file.originalname,
                            favorites: []
                        });

                        user.save().then(user => {
                            res.json({ 'message': 'user added', 'status': 0 });
                        }).catch(err => {
                            res.json({ 'message': 'error', status: 3 });
                        })
                    }
                })
            }
        });
    }
}