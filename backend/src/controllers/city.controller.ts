import * as express from 'express';
import City from '../models/city'

export class CityController {
    getAll = (req: express.Request, res: express.Response) => {
        City.find({}, (err, cities) => {
            if (cities) {
                res.json(cities);
            }
        })
    }
}