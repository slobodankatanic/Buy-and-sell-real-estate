"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstateController = void 0;
const realestate_1 = __importDefault(require("../models/realestate"));
const user_1 = __importDefault(require("../models/user"));
class RealEstateController {
    constructor() {
        this.editRealEstate = (req, res) => {
            let id = req.body.id;
            if (req.body.name == "") {
                res.json({
                    "message": "Required field",
                    "status": 1
                });
                return;
            }
            if (req.body.type == "") {
                res.json({
                    "message": "Required field",
                    "status": 2
                });
                return;
            }
            if (req.body.price == "") {
                res.json({
                    "message": "Required field",
                    "status": 3
                });
                return;
            }
            if (req.body.monthlyUtilities == "") {
                res.json({
                    "message": "Required field",
                    "status": 4
                });
                return;
            }
            if (req.body.area == "") {
                res.json({
                    "message": "Required field",
                    "status": 5
                });
                return;
            }
            if (req.body.rooms == "") {
                res.json({
                    "message": "Required field",
                    "status": 6
                });
                return;
            }
            if (req.body.floor == "") {
                res.json({
                    "message": "Required field",
                    "status": 7
                });
                return;
            }
            if (req.body.totalFloors == "") {
                res.json({
                    "message": "Required field",
                    "status": 8
                });
                return;
            }
            if (req.body.constructionYear == "") {
                res.json({
                    "message": "Required field",
                    "status": 9
                });
                return;
            }
            if (req.body.state == "") {
                res.json({
                    "message": "Required field",
                    "status": 10
                });
                return;
            }
            if (req.body.heating == "") {
                res.json({
                    "message": "Required field",
                    "status": 11
                });
                return;
            }
            if (req.body.cityId == 0) {
                res.json({
                    "message": "Required field",
                    "status": 13
                });
                return;
            }
            if (req.body.municipalityId == 0) {
                res.json({
                    "message": "Required field",
                    "status": 14
                });
                return;
            }
            if (req.body.microlocationId == 0) {
                res.json({
                    "message": "Required field",
                    "status": 15
                });
                return;
            }
            if (req.body.street == "") {
                res.json({
                    "message": "Required field",
                    "status": 16
                });
                return;
            }
            realestate_1.default.updateOne({ "id": id }, {
                $set: {
                    "type": req.body.type,
                    "name": req.body.name,
                    "cityId": req.body.cityId,
                    "municipalityId": req.body.municipalityId,
                    "microlocationId": req.body.microlocationId,
                    "city": req.body.city,
                    "municipality": req.body.municipality,
                    "microlocation": req.body.microlocation,
                    "street": req.body.street,
                    "area": Number(req.body.area),
                    "rooms": Number(req.body.rooms),
                    "constructionYear": Number(req.body.constructionYear),
                    "state": req.body.state,
                    "heating": req.body.heating,
                    "floor": Number(req.body.floor),
                    "totalFloors": Number(req.body.totalFloors),
                    "parking": req.body.parking,
                    "monthlyUtilities": Number(req.body.monthlyUtilities),
                    "price": Number(req.body.price),
                    "about": req.body.description,
                    "lastChange": this.formatDate(new Date())
                }
            }, (err, re) => {
                res.json({ "message": "Successfully changed", "status": 0 });
            });
        };
        this.sellRealEstate = (req, res) => {
            let id = req.body.id;
            realestate_1.default.updateOne({ "id": id }, { $set: { "sold": 1 } }, (err, re) => {
                if (re && !err) {
                    res.json({
                        "message": "Successully sold",
                        "status": 0
                    });
                }
                else {
                    res.json({
                        "message": "Error occurred",
                        "status": 1
                    });
                }
            });
        };
        this.getAdvertiserRealEstates = (req, res) => {
            let advId = req.query.id;
            realestate_1.default.find({ "advertiserId": advId }, (err, realEstates) => {
                res.json(realEstates);
            });
        };
        this.getFavorites = (req, res) => {
            let username = req.query.username;
            user_1.default.findOne({ "username": username }, (err, user) => {
                realestate_1.default.find({ "id": { $in: user.get('favorites') } }, (err, re) => {
                    res.json(re);
                });
            });
        };
        this.getLatest = (req, res) => {
            realestate_1.default.find({ "sold": 0 }).sort({ 'postedAt': -1 }).limit(5).exec((err, realEstates) => {
                res.json(realEstates);
            });
        };
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
                realestate_1.default.find({ "sold": 0, "microlocationId": microlocationId }, (err, realEstates) => {
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
                realestate_1.default.find({ "sold": 0, "type": type, "microlocationId": microlocationId }, (err, realEstates) => {
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
            let maxPrice = req.body.maxPrice;
            let minArea = Number(req.body.minArea);
            let minRooms = Number(req.body.minRooms);
            if (maxPrice == null || isNaN(maxPrice)) {
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
                "sold": 0,
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
    formatDate(date) {
        let month = "" + (date.getMonth() + 1);
        if ((date.getMonth() + 1) < 10) {
            month = "0" + month;
        }
        let day = "" + date.getDate();
        if (date.getDate() < 10) {
            day = "0" + day;
        }
        let hours = "" + date.getHours();
        if (date.getHours() < 10) {
            hours = "0" + hours;
        }
        let minutes = "" + date.getMinutes();
        if (date.getMinutes() < 10) {
            minutes = "0" + minutes;
        }
        let seconds = "" + date.getSeconds();
        if (date.getSeconds() < 10) {
            seconds = "0" + seconds;
        }
        return ([
            date.getFullYear(),
            month,
            day,
        ].join('-') +
            ' ' +
            [
                hours,
                minutes,
                seconds,
            ].join(':'));
    }
}
exports.RealEstateController = RealEstateController;
//# sourceMappingURL=realestate.controller.js.map