"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
class AgencyController {
    constructor() {
        this.getAgencyById = (req, res) => {
            let pib = req.query.pib;
            agency_1.default.findOne({ "pib": pib }, (err, agency) => {
                res.json(agency);
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map