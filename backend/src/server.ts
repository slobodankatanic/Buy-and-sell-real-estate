import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import authRouter from './routers/auth.routes';
import realEstateRouter from './routers/realestate.routes';
import cityRouter from './routers/city.routes';
import microlocationRouter from './routers/microlocation.routes';
import municipalityRouter from './routers/municipality.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/real_estate_sale', {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok');
});

const router = express.Router();

router.use('/auth', authRouter)
router.use('/realestates', realEstateRouter)
router.use('/cities', cityRouter)
router.use('/microlocations', microlocationRouter)
router.use('/municipalities', municipalityRouter)

app.use('/', router)

app.use(express.static('files'))

app.listen(4000, () => console.log(`Express server running on port 4000`));