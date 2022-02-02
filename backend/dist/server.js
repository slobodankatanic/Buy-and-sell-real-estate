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
app.use('/', router);
app.use(express_1.default.static('files'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map