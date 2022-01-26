"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const city_controller_1 = require("../controllers/city.controller");
const cityRouter = express_1.default.Router();
cityRouter.route('/getAll').get((req, res) => new city_controller_1.CityController().getAll(req, res));
exports.default = cityRouter;
//# sourceMappingURL=city.routes.js.map