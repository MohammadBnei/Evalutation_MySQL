const userController = require('../controller/').userController;
const validator = require('../util/validator');

module.exports = (router) => {
	router.use(validator.isAuthenticated);
	// Create a user in the database and return it 
	router.post('/user', userController.createUser);

	// Seach for a user by its id
	router.get('/user/:id', userController.getUserById);

	// Get all users
	router.get('/users', userController.getUsers);

	// Update a user (will update every parameters present in the JSON object passed)
	router.put('/user/:id', userController.updateUser);

	// Delete an user by its id
	router.delete('/user/:id', userController.deleteUser);
}