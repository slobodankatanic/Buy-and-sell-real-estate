import * as express from 'express';
import Agency from '../models/agency'

export class AgencyController {

    getAgencyById = (req: express.Request, res: express.Response) => {
        let pib = req.query.pib;
        Agency.findOne({ "pib": pib }, (err, agency) => {
            res.json(agency);
        })
    }

}