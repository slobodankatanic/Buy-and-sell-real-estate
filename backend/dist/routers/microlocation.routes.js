"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const microlocation_controller_1 = require("../controllers/microlocation.controller");
const microlocationRouter = express_1.default.Router();
microlocationRouter.route('/getAll').get((req, res) => new microlocation_controller_1.MicrolocationController().getAll(req, res));
microlocationRouter.route('/getForMunicipality').get((req, res) => new microlocation_controller_1.MicrolocationController().getForMunicipality(req, res));
microlocationRouter.route('/add').post((req, res) => new microlocation_controller_1.MicrolocationController().addMicrolocation(req, res));
microlocationRouter.route('/delete').post((req, res) => new microlocation_controller_1.MicrolocationController().deleteMicrolocation(req, res));
exports.default = microlocationRouter;
//# sourceMappingURL=microlocation.routes.js.map