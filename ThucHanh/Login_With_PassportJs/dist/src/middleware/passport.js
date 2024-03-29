"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_model_1 = require("../schema/user.model");
const passport_local_1 = __importDefault(require("passport-local"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use('local', new passport_local_1.default(async (username, password, done) => {
    const user = await user_model_1.User.findOne({ username: username });
    console.log(username);
    console.log(password);
    console.log(user);
    if (!user) {
        return done(null, false);
    }
    else {
        console.log();
        if (user.password === password) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map