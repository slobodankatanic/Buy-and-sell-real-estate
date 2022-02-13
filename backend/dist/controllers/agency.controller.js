"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
class AgencyController {
    constructor() {
        this.addAgency = (req, res) => {
            let agencyName = req.body.name;
            let agencyPib = req.body.pib;
            let agencyCity = req.body.city;
            let agencyAddress = req.body.address;
            let agencyContact = req.body.contact;
            agency_1.default.findOne({ "pib": agencyPib }, (err, agency) => {
                if (agencyName == "") {
                    res.json({
                        "message": "Required field",
                        "status": 1
                    });
                    return;
                }
                if (agencyPib == "" || agencyPib == null) {
                    res.json({
                        "message": "Required field",
                        "status": 2
                    });
                    return;
                }
                if (agencyCity == "") {
                    res.json({
                        "message": "Required field",
                        "status": 3
                    });
                    return;
                }
                if (agencyAddress == "") {
                    res.json({
                        "message": "Required field",
                        "status": 4
                    });
                    return;
                }
                if (agencyContact == "" || agencyContact == null) {
                    res.json({
                        "message": "Required field",
                        "status": 5
                    });
                    return;
                }
                let nameRegex = new RegExp(/^[A-Za-z0-9]+(\s+[A-Za-z0-9]+)*$/);
                if (!nameRegex.test(agencyName)) {
                    res.json({
                        "message": "Only letters and numbers allowed",
                        "status": 1
                    });
                    return;
                }
                if (agency) {
                    res.json({
                        "message": "PIB already exists",
                        "status": 2
                    });
                    return;
                }
                let cityRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
                console.log(agencyCity);
                if (!cityRegex.test(agencyCity)) {
                    res.json({
                        "message": "Only letters allowed",
                        "status": 3
                    });
                    return;
                }
                if (!nameRegex.test(agencyAddress)) {
                    res.json({
                        "message": "Only letters and numbers allowed",
                        "status": 4
                    });
                    return;
                }
                let newAgency = new agency_1.default({
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
                });
            });
        };
        this.getAgencyById = (req, res) => {
            let pib = req.query.pib;
            agency_1.default.findOne({ "pib": pib }, (err, agency) => {
                res.json(agency);
            });
        };
        this.getAllAgencies = (req, res) => {
            agency_1.default.find({}, (err, agencies) => {
                res.json(agencies);
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map