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
        imageName = 'img_' + Date.now() + "_" + file.originalname;
        callBack(null, imageName)
    }
});

const upload = multer({ storage: storage });

let imageName = "";

app.post('/auth/register', upload.single('image'), (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (user) {
            res.json({
                'message': 'Username already exists',
                'status': 1
            });
        } else {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (user) {
                    res.json({
                        'message': 'Email already exists',
                        'status': 2
                    })
                } else {
                    let status = "awaiting";
                    if (req.body.admin == "admin") {
                        status = "approved";
                    }

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
                        agencyId: req.body.agencyId,
                        licence: req.body.licence,
                        status: status,
                        image: "http://localhost:4000/images/users/" + imageName,
                        favorites: []
                    });

                    user.save().then(user => {
                        res.json({ 'message': 'user added', 'status': 0 });
                    }).catch(err => {
                        res.json({ 'message': 'error', status: 3 });
                    })
                }
            })
        }
    });
});

app.use('/', router)

app.use(express.static('files'))

app.listen(4000, () => console.log(`Express server running on port 4000`));