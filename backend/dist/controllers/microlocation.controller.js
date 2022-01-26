"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrolocationController = void 0;
const microlocation_1 = __importDefault(require("../models/microlocation"));
class MicrolocationController {
    constructor() {
        this.getAll = (req, res) => {
            microlocation_1.default.find({}, (err, microlocs) => {
                if (microlocs) {
                    res.json(microlocs);
                }
            });
        };
        this.getForMunicipality = (req, res) => {
            let municipalityId = Number(req.query.municipalityId);
            microlocation_1.default.find({ "municipality": municipalityId }, (err, microlocs) => {
                if (microlocs) {
                    res.json(microlocs);
                }
            });
        };
    }
}
exports.MicrolocationController = MicrolocationController;
//# sourceMappingURL=microlocation.controller.js.map