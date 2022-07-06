"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_model_1 = require("../schema/user.model");
const passport_local_1 = __importDefault(require("passport-local"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use('local', new passport_local_1.default(async (username, password, done) => {
    const user = await user_model_1.User.findOne({ username: username });
    if (!user) {
        return done(null, false);
    }
    else {
        if (user.password === password) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
}));
passport_1.default.use(new passport_google_oauth20_1.default({
    clientID: '262351243087-59viarrbs51fnvj2ih5uonlrdics739g.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, async function (request, accessToken, refreshToken, profile, done) {
    try {
        let userGG = await user_model_1.User.find({
            "google.id": profile.id
        });
        console.log(userGG);
        if (!userGG) {
            let data = {
                username: profile.displayName,
                password: 'ddsadsa',
                google: {
                    id: profile.id
                }
            };
            console.log(data);
            let user = new user_model_1.User(data);
            await user.save();
        }
        return done(null, true);
    }
    catch (e) {
        return done(null, false);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map