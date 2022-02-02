"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstateController = void 0;
const realestate_1 = __importDefault(require("../models/realestate"));
class RealEstateController {
    constructor() {
        this.getById = (req, res) => {
            let id = req.query.id;
            realestate_1.default.findOne({ "id": id }, (err, re) => {
                if (err) {
                    console.log(err);
                }
                if (re) {
                    res.json(re);
                }
            });
        };
        this.getAveragePrice = (req, res) => {
            let type = req.query.type;
            let microlocationId = req.query.microlocation;
            if (type == "all") {
                realestate_1.default.find({ "microlocationId": microlocationId }, (err, realEstates) => {
                    let total = 0.0;
                    realEstates.forEach(re => {
                        total += re.get('price') / re.get('area');
                    });
                    if (realEstates.length > 0) {
                        res.json({ "averagePrice": total / realEstates.length });
                    }
                    else {
                        res.json({ "averagePrice": 0.0 });
                    }
                });
            }
            else {
                realestate_1.default.find({ "type": type, "microlocationId": microlocationId }, (err, realEstates) => {
                    let total = 0.0;
                    realEstates.forEach(re => {
                        total += re.get('price') / re.get('area');
                    });
                    if (realEstates.length > 0) {
                        res.json({ "averagePrice": total / realEstates.length });
                    }
                    else {
                        res.json({ "averagePrice": 0.0 });
                    }
                });
            }
        };
        this.getBasicSearchResult = (req, res) => {
            let type = req.body.type;
            let cityId = req.body.city;
            let municipalityId = req.body.municipality;
            let microlocationId = req.body.microlocation;
            let maxPrice = Number(req.body.maxPrice);
            let minArea = Number(req.body.minArea);
            let minRooms = Number(req.body.minRooms);
            if (isNaN(maxPrice)) {
                maxPrice = Number.MAX_SAFE_INTEGER;
            }
            if (isNaN(minArea)) {
                minArea = 0;
            }
            if (isNaN(minRooms)) {
                minRooms = 0;
            }
            let cityIdMin = 0;
            let cityIdMax = Number.MAX_SAFE_INTEGER;
            let municipalityIdMin = 0;
            let municipalityIdMax = Number.MAX_SAFE_INTEGER;
            let microlocationIdMin = 0;
            let microlocationIdMax = Number.MAX_SAFE_INTEGER;
            if (cityId > 0 && municipalityId > 0 && microlocationId > 0) {
                microlocationIdMin = microlocationId;
                microlocationIdMax = microlocationId;
            }
            else if (cityId > 0 && municipalityId > 0 && microlocationId == 0) {
                municipalityIdMin = municipalityId;
                municipalityIdMax = municipalityId;
            }
            else if (cityId > 0 && municipalityId == 0) {
                cityIdMin = cityId;
                cityIdMax = cityId;
            }
            // console.log(cityIdMin + ", " + cityIdMax)
            // console.log(municipalityIdMin + ", " + municipalityIdMax)
            // console.log(microlocationIdMin + ", " + microlocationIdMax)
            // console.log(minArea)
            // console.log(maxPrice)
            // console.log(minRooms + ", " + maxRooms)
            realestate_1.default.find({
                "type": type,
                "cityId": { $gte: cityIdMin, $lte: cityIdMax },
                "municipalityId": { $gte: municipalityIdMin, $lte: municipalityIdMax },
                "microlocationId": { $gte: microlocationIdMin, $lte: microlocationIdMax },
                "area": { $gte: minArea },
                "price": { $lte: maxPrice },
                "rooms": { $gte: minRooms }
            }, (err, realEstates) => {
                if (err) {
                    console.log(err);
                }
                if (realEstates) {
                    res.json(realEstates);
                }
            });
        };
    }
}
exports.RealEstateController = RealEstateController;
//# sourceMappingURL=realestate.controller.js.map