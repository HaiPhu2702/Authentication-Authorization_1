

import passport from "passport";
import LocalStrategy from "passport-local"
import GoogleStrategy from "passport-google-oauth20"
import {User} from "../schema/user.model"
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password!==password) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({
        clientID:'262351243087-59viarrbs51fnvj2ih5uonlrdics739g.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
  },
//  async function(request,accessToken, refreshToken, profile, done) {
//
//
//
//     try{
//         console.log(profile.displayName)
//          //khi goi len gg success gg tra ve profile
//         // kiem tra csdl da co chua,,chua co them vao
//     let user=await User.find({"google.id":profile.id}) ;
//         console.log(user)
//     if(!user[]){
//         let data={
//             username: profile.displayName,
//             password:'qwe',
//             google:{
//                 id: profile.id
//             }
//         }
//         const newUser= new User(data)
//         await newUser.save();
// }
//
//
//         return done(null, user)
//     }catch (e) {
//         return done(null,false)
//     }
//
//  }
// ));


function(accessToken, refreshToken, profile, cb) {
    User.find({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
))

export default passport;







