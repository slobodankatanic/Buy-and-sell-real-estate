"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const municipality_controller_1 = require("../controllers/municipality.controller");
const municipalityRouter = express_1.default.Router();
municipalityRouter.route('/getAll').get((req, res) => new municipality_controller_1.MunicipalityController().getAll(req, res));
municipalityRouter.route('/getById').get((req, res) => new municipality_controller_1.MunicipalityController().getById(req, res));
municipalityRouter.route('/getForCity').get((req, res) => new municipality_controller_1.MunicipalityController().getForCity(req, res));
municipalityRouter.route('/getByNameAndCity').get((req, res) => new municipality_controller_1.MunicipalityController().getByNameAndCity(req, res));
exports.default = municipalityRouter;
//# sourceMappingURL=municipality.routes.js.map