const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const keys = require('../config/key');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
   passport.use(new JwtStrategy(opts,(jwt_payload,done) => {
        console.log(jwt_payload);
        Users.findById(jwt_payload.id).then(user => {
            if(!user){
                return done(null,false);
            }
            return done(null,user);
        })
        .catch(err => console.log(err));
   }))

}