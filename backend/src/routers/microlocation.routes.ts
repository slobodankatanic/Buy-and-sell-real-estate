import express from 'express';
import { MicrolocationController } from '../controllers/microlocation.controller';

const microlocationRouter = express.Router();

microlocationRouter.route('/getAll').get(
    (req, res) => new MicrolocationController().getAll(req, res)
)

microlocationRouter.route('/getForMunicipality').get(
    (req, res) => new MicrolocationController().getForMunicipality(req, res)
)

export default microlocationRouter;