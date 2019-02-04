const commonController = require('../controller').commonController;
const passport = require('passport');

module.exports = (router) => {
    router.get('/session/user', commonController.getSessionUser);

	// Sign up a user
	router.post('/session/signup', commonController.signUp);

	// Sign in
	router.post('/session/signin', commonController.signIn);

    // Sign Out
    router.post('/session/signout', commonController.signOut)
};
