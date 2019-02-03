// importing necessary modules for Passport
const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const pool = require('./database');
const sqlLib = require('../util/sqlLib');
const LocalStrategy = require('passport-local').Strategy;
const sha1 = require('crypto-js/sha1');
const commonModel = require('../model').commonModel;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt-secret'
};

module.exports = (app) => {

    // Initialize Passport session
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Creating the logic for the sign in of users
    passport.use(new Strategy(opts, async (payload, done) => {
        
        try {
            var users = await commonModel.searchUser({email});
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
