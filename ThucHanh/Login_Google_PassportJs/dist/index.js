"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./src/middleware/passport"));
const auth_router_1 = __importDefault(require("./src/routes/auth.router"));
const port = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', './src/views');
mongoose_1.default.connect('mongodb://localhost:27017/Passport')
    .then(() => {
    console.log('connect success');
})
    .catch((err) => { throw err; });
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60 * 60 * 1000 }
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/auth', auth_router_1.default);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log("http://localhost:" + port);
});
//# sourceMappingURL=index.js.map