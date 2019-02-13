const articleController = require('../controller/').articleController;
const validator = require('../util/validator');
const passport = require('passport');

module.exports = (router) => {
	// Create a article in the database and return it 
	router.post('/article', passport.authenticate('jwt', {session: false}),  articleController.createArticle);

	// Seach for a article by its id
	router.get('/article/:id', articleController.getArticleById);

	// Get all articles
	router.get('/articles', passport.authenticate('jwt', {session: false}), articleController.getArticles);

	// Update a article (will update every parameters present in the JSON object passed)
	router.put('/article/:id', articleController.updateArticle);

	// Delete an article by its id
	router.delete('/article/:id', articleController.deleteArticle);
}