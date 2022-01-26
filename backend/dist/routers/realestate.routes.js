"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const realestate_controller_1 = require("../controllers/realestate.controller");
const realEstateRouter = express_1.default.Router();
realEstateRouter.route('/getBasic').post((req, res) => new realestate_controller_1.RealEstateController().getBasicSearchResult(req, res));
exports.default = realEstateRouter;
//# sourceMappingURL=realestate.routes.js.map