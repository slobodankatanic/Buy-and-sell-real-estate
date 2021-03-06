import * as express from 'express';
import Microlocation from '../models/microlocation'
import RealEsatate from '../models/realestate'

export class MicrolocationController {
    getByMunAndName = (req: express.Request, res: express.Response) => {
        let id = req.query.id;
        let mloc = req.query.mloc;

        Microlocation.findOne({"municipality": id, "name": mloc}, (err, micro) => {
            res.json(micro);
        })
    }

    deleteMicrolocation = (req: express.Request, res: express.Response) => {
        RealEsatate.findOne({ "microlocationId": req.body.id }, (err, re) => {
            if (re) {
                res.json({
                    "message": "There are active realestates on this microlocation",
                    "status": 1
                })
            } else {
                Microlocation.deleteOne({ "id": req.body.id }, (err) => {
                    res.json({
                        "message": "Deleted successsfully",
                        "status": 0
                    })
                })
            }
        })
    }

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