"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const passport_1 = __importDefault(require("../middleware/passport"));
const user_model_1 = require("../schema/user.model");
router.get('/create', (req, res) => {
    res.render('create');
});
router.post('/create', upload.none(), async (req, res) => {
    const newUser = new user_model_1.User(req.body);
    await newUser.save();
    res.render('home');
});
router.get('/login', async (req, res) => {
    res.render('login');
});
router.post('/login', upload.none(), async (req, res, next) => {
    await passport_1.default.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('sai password');
        }
        res.render('home');
    })(req, res, next);
});
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    res.send('vao thanh cong');
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map