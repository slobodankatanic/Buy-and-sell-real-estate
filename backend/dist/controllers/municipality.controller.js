"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipalityController = void 0;
const municipality_1 = __importDefault(require("../models/municipality"));
class MunicipalityController {
    constructor() {
        this.getById = (req, res) => {
            let id = req.query.id;
            municipality_1.default.findOne({ "id": id }, (err, mun) => {
                res.json(mun);
            });
        };
        this.getAll = (req, res) => {
            municipality_1.default.find({}, (err, municipalities) => {
                if (municipalities) {
                    res.json(municipalities);
                }
            });
        };
        this.getForCity = (req, res) => {
            let city = req.query.city;
            municipality_1.default.find({ "city": city }, (err, municipalities) => {
                if (municipalities) {
                    res.json(municipalities);
                }
            });
        };
    }
}
exports.MunicipalityController = MunicipalityController;
//# sourceMappingURL=municipality.controller.js.map