import * as express from 'express';
import Microlocation from '../models/microlocation'

export class MicrolocationController {
    addMicrolocation = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let addresses = req.body.addresses;
        let municipality = req.body.municipality;

        Microlocation.find({}, (err, mlocs) => {
            let maxId = 0;

            mlocs.forEach(loc => {
                if (loc.get('id') > maxId) {
                    maxId = loc.get('id');
                }
            })

            let microlocation = new Microlocation({
                id: maxId + 1,
                name: name,
                municipality: municipality,
                streets: addresses
            });

            microlocation.save().then(mloc => {
                res.json({ 'message': 'Microlocation successfully added', 'status': 0 });
            }).catch(err => {
                res.json({ 'message': 'error', status: 6 });
            })
        })
    }

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