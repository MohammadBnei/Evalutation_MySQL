const commonController = require('../controller').commonController;
const passport = require('passport');

module.exports = (router) => {
    router.get('/session/user', commonController.getSessionUser);

	// Sign up a user
	router.post('/signup', commonController.signUp);

	// Sign in
	router.post('/signin', passport.authenticate('local'), commonController.signIn);

    // Sign Out
    router.post('/signout', commonController.signOut)
};
