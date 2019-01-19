const articleController = require('../controller/').articleController;
const validator = require('../util/validator');
//var passport = require('passport');

module.exports = (router) => {
	// Create a article in the database and return it 
	router.post('/article', validator.createArticle,  articleController.createArticle);

	// Seach for a article by its id
	router.get('/article/:id', articleController.getArticleById);

	// Get all articles
	router.get('/articles', articleController.getArticles);

	// Update a article (will update every parameters present in the JSON object passed)
	router.put('/article', articleController.updateArticle);

	// Delete an article by its id
	router.delete('/article/:id', articleController.deleteArticle);
}