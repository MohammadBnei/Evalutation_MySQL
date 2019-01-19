const pool = require('../config/database');
const errorHandler = require('../util/errorHandler');
const sqlLib = require('../util/sqlLib');
const userController = require('./user');

module.exports = {
    // Signup
    async signUp(req, res) {
        var newUser = {...req.body};

        try {
            var result = await pool.query(sqlLib.buildFindByElemQuery({email: newUser.email}, 'user'));

            if (result.length) throw new Error('Email taken');

            newUser = await userController.createUser(req, res, false);

            req.login(newUser, (err) => res.status(201).send(req.user))
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }
    },

    signIn(req, res) {
        res.status(200).send(req.user);
    },

    signOut(req, res) {
        req.logout();
        req.session.destroy();
        res.status(200).send('Ok');
    },

    getSessionUser(req, res) {
        if (!req.user) res.status(403).send('No user connected');
        else res.status(200).send(req.user);
    }
};
