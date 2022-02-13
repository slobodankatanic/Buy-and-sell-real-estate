import * as express from 'express';
import Agency from '../models/agency'

export class AgencyController {
    addAgency = (req: express.Request, res: express.Response) => {
        let agencyName = req.body.name;
        let agencyPib = req.body.pib;
        let agencyCity = req.body.city;
        let agencyAddress = req.body.address;
        let agencyContact = req.body.contact;

        Agency.findOne({ "pib": agencyPib }, (err, agency) => {
            if (agencyName == "") {
                res.json({
                    "message": "Required field",
                    "status": 1
                })
                return;
            }
            if (agencyPib == "" || agencyPib == null) {
                res.json({
                    "message": "Required field",
                    "status": 2
                })
                return;
            }
            if (agencyCity == "") {
                res.json({
                    "message": "Required field",
                    "status": 3
                })
                return;
            }
            if (agencyAddress == "") {
                res.json({
                    "message": "Required field",
                    "status": 4
                })
                return;
            }
            if (agencyContact == "" || agencyContact == null) {
                res.json({
                    "message": "Required field",
                    "status": 5
                })
                return;
            }

            let nameRegex = new RegExp(/^[A-Za-z0-9]+(\s+[A-Za-z0-9]+)*$/);
            if (!nameRegex.test(agencyName)) {
                res.json({
                    "message": "Only letters and numbers allowed",
                    "status": 1
                })
                return;
            }

            if (agency) {
                res.json({
                    "message": "PIB already exists",
                    "status": 2
                })
                return;
            }

            let cityRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
            if (!cityRegex.test(agencyCity)) {
                res.json({
                    "message": "Only letters allowed",
                    "status": 3
                })
                return;
            }

            if (!nameRegex.test(agencyAddress)) {
                res.json({
                    "message": "Only letters and numbers allowed",
                    "status": 4
                })
                return;
            }

            let newAgency = new Agency({
                pib: agencyPib,
                name: agencyName,
                address: agencyAddress,
                telephone: agencyContact,
                city: agencyCity
            });

            newAgency.save().then(agency => {
                res.json({ 'message': 'Agency successfully added', 'status': 0 });
            }).catch(err => {
                res.json({ 'message': 'error', status: 6 });
            })
        })

    }

    getAgencyById = (req: express.Request, res: express.Response) => {
        let pib = req.query.pib;
        Agency.findOne({ "pib": pib }, (err, agency) => {
            res.json(agency);
        })
    }

    getAllAgencies = (req: express.Request, res: express.Response) => {
        Agency.find({}, (err, agencies) => {
            res.json(agencies);
        })
    }

}