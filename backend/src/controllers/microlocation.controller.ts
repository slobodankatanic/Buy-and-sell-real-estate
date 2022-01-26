import * as express from 'express';
import Microlocation from '../models/microlocation'

export class MicrolocationController {
    getAll = (req: express.Request, res: express.Response) => {
        Microlocation.find({}, (err, microlocs) => {
            if (microlocs) {
                res.json(microlocs);
            }
        })
    }

    getForMunicipality = (req: express.Request, res: express.Response) => {
        let municipalityId = Number(req.query.municipalityId);

        Microlocation.find({ "municipality": municipalityId }, (err, microlocs) => {
            if (microlocs) {
                res.json(microlocs);
            }
        })
    }
}