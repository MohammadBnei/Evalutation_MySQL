const categoryController = require('../controller/').categoryController;
const validator = require('../util/validator');
//var passport = require('passport');

module.exports = (router) => {
	// Create a category in the database and return it 
	router.post('/category', categoryController.createCategory);

	// Seach for a category by its id
	router.get('/category/:id', categoryController.getCategoryById);

	// Get all categories
	router.get('/categories', categoryController.getCategories);

	// Update a category (will update every parameters present in the JSON object passed)
	router.put('/category', categoryController.updateCategory);

	// Delete an category by its id
	router.delete('/category/:id', categoryController.deleteCategory);
}