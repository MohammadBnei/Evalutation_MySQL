const userController = require('../controller/').userController;
const validator = require('../util/validator');
const passport = require('passport');

module.exports = (router) => {
	// Create a user in the database and return it 
	router.post('/user', userController.createUser);

	// Seach for a user by its id
	router.get('/user/:id', passport.authenticate('jwt', {session: false}), userController.getUserById);

	// Get all users
	router.get('/users', passport.authenticate('jwt', {session: false}), userController.getUsers);

	// Update a user (will update every parameters present in the JSON object passed)
	router.put('/user/:id', passport.authenticate('jwt', {session: false}), userController.updateUser);

	// Delete an user by its id
	router.delete('/user/:id', passport.authenticate('jwt', {session: false}), userController.deleteUser);
}