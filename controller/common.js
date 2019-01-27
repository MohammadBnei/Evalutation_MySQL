const errorHandler = require('../util/errorHandler');
const userModel = require('../model').userModel;
const commonModel = require('../model').commonModel;

module.exports = {
    // Signup
    async signUp(req, res) {
        try {
            var newUser = { ...req.body
            };

            var result = await userModel.searchUser({
                email: newUser.email
            });

            if (result.length) throw new Error('Email taken');

            newUser = await userModel.createUser(newUser);
            newUser = newUser[0];

            req.login(newUser, (err) => res.status(201).send(newUser));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
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
    },

    async searchArticle(req, res) {
        var words = req.body.words;
            categories = req.body.categories;

        try {
            let results = await commonModel.searchArticle(words, categories);

            res.status(200).send(results);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    }
};