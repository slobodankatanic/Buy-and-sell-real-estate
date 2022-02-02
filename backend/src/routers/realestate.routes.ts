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

export default realEstateRouter;