import express from 'express';
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/get').get(
    (req, res) => new AgencyController().getAgencyById(req, res)
)

agencyRouter.route('/getAll').get(
    (req, res) => new AgencyController().getAllAgencies(req, res)
)

export default agencyRouter;