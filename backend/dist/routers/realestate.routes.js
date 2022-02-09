"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const realestate_controller_1 = require("../controllers/realestate.controller");
const realEstateRouter = express_1.default.Router();
realEstateRouter.route('/get').get((req, res) => new realestate_controller_1.RealEstateController().getById(req, res));
realEstateRouter.route('/getBasic').post((req, res) => new realestate_controller_1.RealEstateController().getBasicSearchResult(req, res));
realEstateRouter.route('/getAveragePrice').get((req, res) => new realestate_controller_1.RealEstateController().getAveragePrice(req, res));
realEstateRouter.route('/getLatest').get((req, res) => new realestate_controller_1.RealEstateController().getLatest(req, res));
exports.default = realEstateRouter;
//# sourceMappingURL=realestate.routes.js.map