import * as express from 'express';
import Municipality from '../models/municipality'

export class MunicipalityController {
    getAll = (req: express.Request, res: express.Response) => {
        Municipality.find({}, (err, municipalities) => {
            if (municipalities) {
                res.json(municipalities);
            }
        })
    }

    getForCity = (req: express.Request, res: express.Response) => {
        let city = req.query.city;

        Municipality.find({ "city": city }, (err, municipalities) => {
            if (municipalities) {
                res.json(municipalities);
            }
        })
    }
}