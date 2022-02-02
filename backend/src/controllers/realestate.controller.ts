import * as express from 'express';
import RealEstate from '../models/realestate'

export class RealEstateController {

    getById = (req: express.Request, res: express.Response) => {
        let id = req.query.id;

        RealEstate.findOne({"id": id}, (err, re) => {
            if (err) {
                console.log(err);
            }
            if (re) {
                res.json(re);
            }
        })
    }

    getAveragePrice = (req: express.Request, res: express.Response) => {
        let type = req.query.type;
        let microlocationId = req.query.microlocation;

        if (type == "all") {
            RealEstate.find({ "microlocationId": microlocationId }, (err, realEstates) => {
                let total = 0.0;

                realEstates.forEach(re => {
                    total += re.get('price') / re.get('area');
                })

                if (realEstates.length > 0) {
                    res.json({ "averagePrice": total / realEstates.length });
                } else {
                    res.json({ "averagePrice": 0.0 });
                }
            })
        } else {
            RealEstate.find({ "type": type, "microlocationId": microlocationId }, (err, realEstates) => {
                let total = 0.0;

                realEstates.forEach(re => {
                    total += re.get('price') / re.get('area');
                })

                if (realEstates.length > 0) {
                    res.json({ "averagePrice": total / realEstates.length });
                } else {
                    res.json({ "averagePrice": 0.0 });
                }
            })
        }
    }

    getBasicSearchResult = (req: express.Request, res: express.Response) => {
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
        } else if (cityId > 0 && municipalityId > 0 && microlocationId == 0) {
            municipalityIdMin = municipalityId;
            municipalityIdMax = municipalityId;
        } else if (cityId > 0 && municipalityId == 0) {
            cityIdMin = cityId;
            cityIdMax = cityId;
        }

        // console.log(cityIdMin + ", " + cityIdMax)
        // console.log(municipalityIdMin + ", " + municipalityIdMax)
        // console.log(microlocationIdMin + ", " + microlocationIdMax)
        // console.log(minArea)
        // console.log(maxPrice)
        // console.log(minRooms + ", " + maxRooms)

        RealEstate.find({
            "type": type,
            "cityId": { $gte: cityIdMin, $lte: cityIdMax },
            "municipalityId": { $gte: municipalityIdMin, $lte: municipalityIdMax },
            "microlocationId": { $gte: microlocationIdMin, $lte: microlocationIdMax },
            "area": { $gte: minArea },
            "price": { $lte: maxPrice },
            "rooms": { $gte: minRooms }
        }, (err, realEstates) => {
            if (err) {
                console.log(err)
            }
            if (realEstates) {
                res.json(realEstates);
            }
        });
    }
}