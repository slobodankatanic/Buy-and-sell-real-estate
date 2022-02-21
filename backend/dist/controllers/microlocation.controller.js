"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrolocationController = void 0;
const microlocation_1 = __importDefault(require("../models/microlocation"));
const realestate_1 = __importDefault(require("../models/realestate"));
class MicrolocationController {
    constructor() {
        this.deleteMicrolocation = (req, res) => {
            realestate_1.default.findOne({ "microlocationId": req.body.id }, (err, re) => {
                if (re) {
                    res.json({
                        "message": "There are active realestates on this microlocation",
                        "status": 1
                    });
                }
                else {
                    microlocation_1.default.deleteOne({ "id": req.body.id }, (err) => {
                        res.json({
                            "message": "Deleted successsfully",
                            "status": 0
                        });
                    });
                }
            });
        };
        this.addMicrolocation = (req, res) => {
            let name = req.body.name;
            let addresses = req.body.addresses;
            let municipality = req.body.municipality;
            microlocation_1.default.find({}, (err, mlocs) => {
                let maxId = 0;
                mlocs.forEach(loc => {
                    if (loc.get('id') > maxId) {
                        maxId = loc.get('id');
                    }
                });
                let microlocation = new microlocation_1.default({
                    id: maxId + 1,
                    name: name,
                    municipality: municipality,
                    streets: addresses
                });
                microlocation.save().then(mloc => {
                    res.json({ 'message': 'Microlocation successfully added', 'status': 0 });
                }).catch(err => {
                    res.json({ 'message': 'error', status: 6 });
                });
            });
        };
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