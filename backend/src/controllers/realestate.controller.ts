import * as express from 'express';
import RealEstate from '../models/realestate'

export class RealEstateController {
    getBasicSearchResult = (req: express.Request, res: express.Response) => {
        let type = req.body.type;
        let city = req.body.city;
        let municipality = req.body.municipality;
        let microlocation = req.body.microlocation;
        let maxPrice = Number(req.body.maxPrice);
        let minArea = Number(req.body.minArea);
        let minRooms = Number(req.body.minRooms);
        let maxRooms = Number(req.body.minRooms);

        if (isNaN(maxPrice)) {
            maxPrice = Number.MAX_SAFE_INTEGER;
        }
        if (isNaN(minArea)) {
            minArea = 0;
        }
        if (isNaN(minRooms)) {
            minRooms = 0;
            maxRooms = Number.MAX_SAFE_INTEGER;
        } else if (minRooms > 5.0) {
            maxRooms = Number.MAX_SAFE_INTEGER;
        } else {
            maxRooms = minRooms;
        }

        let cityPattern;
        let municipalityPattern;
        let microlocationPattern;

        if (city == "" || municipality != "") {
            cityPattern = "";

            if (city == "") {
                // u ovom slucaju nista
                municipalityPattern = "";
                microlocationPattern = "";
            } else if (microlocation != "") {
                municipalityPattern = "";
                // nadji id od mikrolokacije
                microlocationPattern = new RegExp("^" + microlocation + "$");
            } else {
                microlocationPattern = "";
                // nadji id od opstine
                municipalityPattern = new RegExp("^" + municipality + "$");
            }
        } else {
            // nadji id od grada
            // dodaj id grada u real estate
            cityPattern = new RegExp("^" + city + "$");
            municipalityPattern = "";
            microlocationPattern = "";
        }

        RealEstate.find({ "type": type, "city": { $regex: cityPattern }}, (err, realEstates) => {

        });
    }
}