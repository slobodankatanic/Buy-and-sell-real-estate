import express from 'express';
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/get').get(
    (req, res) => new AgencyController().getAgencyById(req, res)
)

agencyRouter.route('/getAll').get(
    (req, res) => new AgencyController().getAllAgencies(req, res)
)

agencyRouter.route('/add').post(
    (req, res) => new AgencyController().addAgency(req, res)
)

export default agencyRouter;