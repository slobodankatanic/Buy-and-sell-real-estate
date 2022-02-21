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
const realestate_1 = __importDefault(require("./models/realestate"));
const fs = require('fs');
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
        callBack(null, 'files/images');
    },
    filename: (req, file, callBack) => {
        imageName = 'img_' + Date.now() + "_" + file.originalname;
        imageNames.push(imageName);
        callBack(null, imageName);
    }
});
const upload = multer({ storage: storage });
let imageName = "";
app.post('/auth/register', upload.single('image'), (req, res, next) => {
    let imageNameTemp = imageName;
    imageName = "";
    imageNames = [];
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
                        agencyId: req.body.agencyId,
                        licence: req.body.licence,
                        status: status,
                        image: "http://localhost:4000/images/" + imageNameTemp,
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
function deleteImages(images) {
    for (let i = 0; i < images.length; i++) {
        if (fs.existsSync("files/images/" + images[i])) {
            fs.unlinkSync("files/images/" + images[i]);
        }
    }
}
function formatDate(date) {
    let month = "" + (date.getMonth() + 1);
    if ((date.getMonth() + 1) < 10) {
        month = "0" + month;
    }
    let day = "" + date.getDate();
    if (date.getDate() < 10) {
        day = "0" + day;
    }
    let hours = "" + date.getHours();
    if (date.getHours() < 10) {
        hours = "0" + hours;
    }
    let minutes = "" + date.getMinutes();
    if (date.getMinutes() < 10) {
        minutes = "0" + minutes;
    }
    let seconds = "" + date.getSeconds();
    if (date.getSeconds() < 10) {
        seconds = "0" + seconds;
    }
    return ([
        date.getFullYear(),
        month,
        day,
    ].join('-') +
        ' ' +
        [
            hours,
            minutes,
            seconds,
        ].join(':'));
}
let imageNames = [];
app.post('/realestates/add', upload.array('images'), (req, res, next) => {
    let imageNamesTemp = imageNames;
    imageName = "";
    imageNames = [];
    if (req.body.name == "") {
        res.json({
            "message": "Required field",
            "status": 1
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.type == "") {
        res.json({
            "message": "Required field",
            "status": 2
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.price == "") {
        res.json({
            "message": "Required field",
            "status": 3
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.monthlyUtilities == "") {
        res.json({
            "message": "Required field",
            "status": 4
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.area == "") {
        res.json({
            "message": "Required field",
            "status": 5
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.rooms == "") {
        res.json({
            "message": "Required field",
            "status": 6
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.floor == "") {
        res.json({
            "message": "Required field",
            "status": 7
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.totalFloors == "") {
        res.json({
            "message": "Required field",
            "status": 8
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.constructionYear == "") {
        res.json({
            "message": "Required field",
            "status": 9
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.state == "") {
        res.json({
            "message": "Required field",
            "status": 10
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.heating == "") {
        res.json({
            "message": "Required field",
            "status": 11
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.cityId == 0) {
        res.json({
            "message": "Required field",
            "status": 13
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.municipalityId == 0) {
        res.json({
            "message": "Required field",
            "status": 14
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.microlocationId == 0) {
        res.json({
            "message": "Required field",
            "status": 15
        });
        deleteImages(imageNamesTemp);
        return;
    }
    if (req.body.street == "") {
        res.json({
            "message": "Required field",
            "status": 16
        });
        deleteImages(imageNamesTemp);
        return;
    }
    realestate_1.default.find({}, (err, re) => {
        if (re) {
            let maxId = 0;
            re.forEach(item => {
                if (item.get('id') > maxId) {
                    maxId = item.get('id');
                }
            });
            for (let i = 0; i < imageNamesTemp.length; i++) {
                imageNamesTemp[i] = "http://localhost:4000/images/" + imageNamesTemp[i];
            }
            let postedAt = formatDate(new Date());
            let newRealEstate = new realestate_1.default({
                "id": maxId + 1,
                "type": req.body.type,
                "name": req.body.name,
                "cityId": req.body.cityId,
                "municipalityId": req.body.municipalityId,
                "microlocationId": req.body.microlocationId,
                "city": req.body.city,
                "municipality": req.body.municipality,
                "microlocation": req.body.microlocation,
                "street": req.body.street,
                "area": Number(req.body.area),
                "rooms": Number(req.body.rooms),
                "constructionYear": Number(req.body.constructionYear),
                "state": req.body.state,
                "heating": req.body.heating,
                "floor": Number(req.body.floor),
                "totalFloors": Number(req.body.totalFloors),
                "parking": req.body.parking,
                "monthlyUtilities": Number(req.body.monthlyUtilities),
                "price": Number(req.body.price),
                "about": req.body.description,
                "sold": 0,
                "lastChange": "2020-01-15 18:24",
                "postedAt": postedAt,
                "images": imageNamesTemp,
                "transportLines": req.body.transportLines.split(","),
                "advertiserId": req.body.advertiser,
                "characteristics": JSON.parse(req.body.characteristics.toString())
            });
            newRealEstate.save().then(re => {
                res.json({ 'message': 'Real estate successfully added', 'status': 0 });
            }).catch(err => {
                res.json({ 'message': 'error', status: 18 });
            });
        }
        else {
            // error
        }
    });
});
app.use('/', router);
app.use(express_1.default.static('files'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map