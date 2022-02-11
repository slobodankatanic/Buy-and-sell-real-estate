"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routers/auth.routes"));
const realestate_routes_1 = __importDefault(require("./routers/realestate.routes"));
const city_routes_1 = __importDefault(require("./routers/city.routes"));
const microlocation_routes_1 = __importDefault(require("./routers/microlocation.routes"));
const municipality_routes_1 = __importDefault(require("./routers/municipality.routes"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const agency_routes_1 = __importDefault(require("./routers/agency.routes"));
const user_1 = __importDefault(require("./models/user"));
const multer = require('multer');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/real_estate_sale', { useNewUrlParser: true });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/realestates', realestate_routes_1.default);
router.use('/cities', city_routes_1.default);
router.use('/microlocations', microlocation_routes_1.default);
router.use('/municipalities', municipality_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/agency', agency_routes_1.default);
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'files/images/users');
    },
    filename: (req, file, callBack) => {
        callBack(null, `__img__${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
app.post('/auth/register', upload.single('image'), (req, res, next) => {
    user_1.default.findOne({ username: req.body.username }, (err, user) => {
        if (user) {
            res.json({
                'message': 'Username already exists',
                'status': 1
            });
        }
        else {
            user_1.default.findOne({ email: req.body.email }, (err, user) => {
                if (user) {
                    res.json({
                        'message': 'Email already exists',
                        'status': 2
                    });
                }
                else {
                    let status = "awaiting";
                    if (req.body.admin == "admin") {
                        status = "approved";
                    }
                    let user = new user_1.default({
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
                        status: status,
                        image: "http://localhost:4000/images/users/__img__" + req.file.originalname,
                        favorites: []
                    });
                    user.save().then(user => {
                        res.json({ 'message': 'user added', 'status': 0 });
                    }).catch(err => {
                        res.json({ 'message': 'error', status: 3 });
                    });
                }
            });
        }
    });
});
app.use('/', router);
app.use(express_1.default.static('files'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map