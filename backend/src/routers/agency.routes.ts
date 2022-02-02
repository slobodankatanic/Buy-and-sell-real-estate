import express from 'express';
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/get').get(
    (req, res) => new AgencyController().getAgencyById(req, res)
)

export default agencyRouter;