import express from 'express';
import { MunicipalityController } from '../controllers/municipality.controller';

const municipalityRouter = express.Router();

municipalityRouter.route('/getAll').get(
    (req, res) => new MunicipalityController().getAll(req, res)
)

municipalityRouter.route('/getById').get(
    (req, res) => new MunicipalityController().getById(req, res)
)

municipalityRouter.route('/getForCity').get(
    (req, res) => new MunicipalityController().getForCity(req, res)
)

municipalityRouter.route('/getByNameAndCity').get(
    (req, res) => new MunicipalityController().getByNameAndCity(req, res)
)

export default municipalityRouter;