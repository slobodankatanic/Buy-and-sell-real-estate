import express from 'express';
import { MicrolocationController } from '../controllers/microlocation.controller';

const microlocationRouter = express.Router();

microlocationRouter.route('/getAll').get(
    (req, res) => new MicrolocationController().getAll(req, res)
)

microlocationRouter.route('/getForMunicipality').get(
    (req, res) => new MicrolocationController().getForMunicipality(req, res)
)

microlocationRouter.route('/add').post(
    (req, res) => new MicrolocationController().addMicrolocation(req, res)
)

microlocationRouter.route('/delete').post(
    (req, res) => new MicrolocationController().deleteMicrolocation(req, res)
)

export default microlocationRouter;