"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const passport_1 = __importDefault(require("passport"));
const user_model_1 = require("../schema/user.model");
const upload = (0, multer_1.default)();
router.get("/create", (req, res) => {
    res.render("create");
});
router.post("/create", upload.none(), async (req, res) => {
    console.log(req.body);
    const newUser = new user_model_1.User(req.body);
    console.log(newUser);
    await newUser.save();
    res.end("success create");
});
router.get('/login', (req, res, next) => {
    res.render('login');
});
router.post('/login', upload.none(), async (req, res, next) => {
    passport_1.default.authenticate("local", (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('wrong password');
        }
        req.login(user, () => {
            res.send('you are authenticated');
        });
    })(req, res, next);
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map