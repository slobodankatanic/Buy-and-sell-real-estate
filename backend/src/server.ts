import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import authRouter from './routers/auth.routes';
import realEstateRouter from './routers/realestate.routes';
import cityRouter from './routers/city.routes';
import microlocationRouter from './routers/microlocation.routes';
import municipalityRouter from './routers/municipality.routes';
import userRouter from './routers/user.routes';
import agencyRouter from './routers/agency.routes';
import User from './models/user';

const multer = require('multer');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/real_estate_sale', { useNewUrlParser: true });
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
router.use('/users', userRouter)
router.use('/agency', agencyRouter)

const storage = multer.diskStorage({
    destination: (req: any, file: any, callBack: any) => {
        callBack(null, 'files/images/users')
    },
    filename: (req: any, file: any, callBack: any) => {
        callBack(null, `__img__${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

app.post('/auth/register', upload.single('image'), (req, res, next) => {
    let user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        type: req.body.type,
        city: req.body.city,
        dob: req.body.dateOfBirth,
        telephone: req.body.telephone,
        email: req.body.email,
        agencyId: Number(req.body.agencyId),
        licence: Number(req.body.licence),
        status: "awaiting",
        image: "http://localhost:4000/images/users/__img__" + req.file.originalname,
        favorites: []
    });

    user.save().then(user => {
        res.status(200).json({ 'message': 'user added' });
    }).catch(err => {
        res.status(400).json({ 'message': 'error' });
    })
});

app.use('/', router)

app.use(express.static('files'))

app.listen(4000, () => console.log(`Express server running on port 4000`));