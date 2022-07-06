import passport from "passport"
import {User} from '../schema/user.model'
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({username: username});
    if (!user){
        return done(null, false);
    } else {
        if (user.password === password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
}));

passport.use(new GoogleStrategy({
        clientID:'262351243087-59viarrbs51fnvj2ih5uonlrdics739g.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
   async function(request,accessToken, refreshToken, profile, done) {
    try{

        let userGG = await User.find({
            "google.id": profile.id
        })
        console.log(userGG)
        if (!userGG) {
            let data = {
                username: profile.displayName,
                password: 'ddsadsa',
                google: {
                    id: profile.id
                }
            }
            console.log(data)
            let user = new User(data);
            await user.save()
        }
        return done(null, true)

    }catch (e) {
        return done(null, false)
    }


    }
));













export default passport;



















