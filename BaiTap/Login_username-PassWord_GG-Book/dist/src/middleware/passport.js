"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_model_1 = require("../schema/user.model");
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use(new passport_local_1.default(function (username, password, done) {
    user_model_1.User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (user.password !== password) {
            return done(null, false);
        }
        return done(null, user);
    });
}));
passport_1.default.use(new passport_google_oauth20_1.default({
    clientID: '262351243087-59viarrbs51fnvj2ih5uonlrdics739g.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, function (accessToken, refreshToken, profile, cb) {
    user_model_1.User.find({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
    });
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map