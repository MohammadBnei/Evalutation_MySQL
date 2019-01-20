// importing necessary modules for Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../model').userModel;

module.exports = (app) => {

    // Initialize Passport session
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Creating the logic for the sign in of users
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, async (req, email, password, done) => {
        if (!email || !password) {
            return done(null, false);
        }
        try {
            var users = await userModel.searchUser({email});
            if (!users.length) return done(null, false);

            let user = users[0];

            if (user.password != sha1(password)) return done(null, false)

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
