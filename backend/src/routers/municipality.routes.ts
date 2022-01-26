import express from 'express';
import { MunicipalityController } from '../controllers/municipality.controller';

const municipalityRouter = express.Router();

municipalityRouter.route('/getAll').get(
    (req, res) => new MunicipalityController().getAll(req, res)
)

municipalityRouter.route('/getForCity').get(
    (req, res) => new MunicipalityController().getForCity(req, res)
)

export default municipalityRouter;