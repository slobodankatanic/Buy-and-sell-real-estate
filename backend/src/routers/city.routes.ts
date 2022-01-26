import express from 'express';
import { CityController } from '../controllers/city.controller';

const cityRouter = express.Router();

cityRouter.route('/getAll').get(
    (req, res) => new CityController().getAll(req, res)
)

export default cityRouter;