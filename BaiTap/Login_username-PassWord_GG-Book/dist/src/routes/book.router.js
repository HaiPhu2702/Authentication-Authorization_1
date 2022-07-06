"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
router.get('/login', async (req, res) => {
    res.render('login');
});
router.post('/login', upload.none(), async (req, res) => {
});
exports.default = router;
//# sourceMappingURL=book.router.js.map