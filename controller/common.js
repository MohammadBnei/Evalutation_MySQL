const errorHandler = require('../util/errorHandler');
const jwt = require('jsonwebtoken');
const userModel = require('../model').userModel;
const articleModel = require('../model').articleModel;
const sha1 = require('crypto-js/sha1');

module.exports = {
    // Signup
    async signUp(req, res) {
        try {
            var newUser = { ...req.body };

            var result = await userModel.searchUser(newUser.email);

            if (result.length) throw new Error('Email taken');

            newUser = await userModel.createUser(newUser);
            newUser = newUser[0];

            res.redirect(307, '/session/signin');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async signIn(req, res) {
        try {
            var {email, password} = req.body;

            var users = await userModel.searchUser(email);
            if (!users.length) throw new Error ('User not found');

            let user = users[0];

            if (user.password != sha1(password)) throw new Error ('Wrong password');

            req.login(user, (err) => {
                if (err) throw new Error (err);
                const payload = {user_id: user.user_id};
                let token = jwt.sign(payload, 'secret');
                res.status(200).send({message: 'Ok', token, user});
                console.log('Logged In with email : ', user.email, token)
            })

        } catch (error) {
            errorHandler.loginErrorHandler(error, res);
        }
    },

    signOut(req, res) {
        req.logout();
        req.session.destroy();
        res.status(200).send('Ok');
    },

    getSessionUser(req, res) {
        if (!req.user) res.status(401).send('No user connected');
        else res.status(200).send(req.user);
    }
};