"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Agency = new Schema({
    pib: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    telephone: {
        type: String
    },
    city: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Agency', Agency, 'agency');
//# sourceMappingURL=agency.js.map