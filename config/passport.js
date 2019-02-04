// importing necessary modules for Passport
const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const userModel = require('../model').userModel;



module.exports = (app) => {
    
    // Initialize Passport session
    app.use(passport.initialize());
    app.use(passport.session());

    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret'
    };

    // Creating the logic for the sign in of users
    passport.use(new Strategy(opts, async (payload, done) => {
        console.log('Passport JWT Strategy');
        try {
            var user = await userModel.getUserById(payload.user_id);
            console.log(user);

            if (!user) return done(null, false);

            return done(null, user);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => done(null, user.user_id));

    passport.deserializeUser(async (user_id, done) => {
        try {
            var result = await pool.query(sqlLib.buildFindByIdQuery({user_id}));
            return done(null, result[0]);
        } catch (error) {
            console.log(error);
        }
    });
};
