import express from 'express';
import { RealEstateController } from '../controllers/realestate.controller';

const realEstateRouter = express.Router();

realEstateRouter.route('/get').get(
    (req, res) => new RealEstateController().getById(req, res)
)

realEstateRouter.route('/getBasic').post(
    (req, res) => new RealEstateController().getBasicSearchResult(req, res)
)

realEstateRouter.route('/getAveragePrice').get(
    (req, res) => new RealEstateController().getAveragePrice(req, res)
)

realEstateRouter.route('/getLatest').get(
    (req, res) => new RealEstateController().getLatest(req, res)
)

realEstateRouter.route('/getFavorites').get(
    (req, res) => new RealEstateController().getFavorites(req, res)
)

realEstateRouter.route('/getForAdvertiser').get(
    (req, res) => new RealEstateController().getAdvertiserRealEstates(req, res)
)

realEstateRouter.route('/sell').post(
    (req, res) => new RealEstateController().sellRealEstate(req, res)
)

realEstateRouter.route('/edit').post(
    (req, res) => new RealEstateController().editRealEstate(req, res)
)

export default realEstateRouter;