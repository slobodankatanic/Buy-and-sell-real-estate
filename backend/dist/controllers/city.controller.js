"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityController = void 0;
const city_1 = __importDefault(require("../models/city"));
class CityController {
    constructor() {
        this.getAll = (req, res) => {
            city_1.default.find({}, (err, cities) => {
                if (cities) {
                    res.json(cities);
                }
            });
        };
    }
}
exports.CityController = CityController;
//# sourceMappingURL=city.controller.js.map