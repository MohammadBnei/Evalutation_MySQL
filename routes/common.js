const commonController = require('../controller').commonController;
const passport = require('passport');

module.exports = (router) => {
    router.get('/session/user', passport.authenticate('jwt', {session: false}), commonController.getSessionUser);

	// Sign up a user
	router.post('/session/signup', commonController.signUp);

	// Sign in
	router.post('/session/signin', commonController.signIn);

    // Sign Out
    router.post('/session/signout', passport.authenticate('jwt', {session: false}), commonController.signOut)

	// Image handling
	router.post('/img', passport.authenticate('jwt', {session: false}), commonController.handleImage)

	// Image replacing
	router.post('/img/:old', passport.authenticate('jwt', {session: false}), commonController.replaceImage)
};
