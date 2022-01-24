import express from 'express';
import { RealEstateController } from '../controllers/realestate.controller';

const realEstateRouter = express.Router();

realEstateRouter.route('/getBasic').post(
    (req, res) => new RealEstateController().getBasicSearchResult(req, res)
)

export default realEstateRouter;