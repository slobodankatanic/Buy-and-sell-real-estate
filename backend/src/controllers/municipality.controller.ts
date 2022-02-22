import * as express from 'express';
import Municipality from '../models/municipality'

export class MunicipalityController {
    getByNameAndCity = (req: express.Request, res: express.Response) => {
        let city = req.query.city;
        let mun = req.query.mun;

        Municipality.findOne({ "name": mun, "city": city }, (err, mun) => {
            res.json(mun);
        })
    }

    getById = (req: express.Request, res: express.Response) => {
        let id = req.query.id;

        Municipality.findOne({ "id": id }, (err, mun) => {
            res.json(mun)
        })
    }

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