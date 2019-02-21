const articleController = require('../controller/').articleController;
const validator = require('../util/validator');
const passport = require('passport');

module.exports = (router) => {
	router.use('/article', passport.authenticate('jwt', {session: false}));

	// Create a article in the database and return it 
	router.post('/article',   articleController.createArticle);

	// Seach for a article by its id
	router.get('/article/:id',  articleController.getArticleById);

	// Get all articles
	router.get('/articles',  articleController.getArticles);

	// Update a article (will update every parameters present in the JSON object passed)
	router.put('/article/:id',  articleController.updateArticle);

	// Delete an article by its id
	router.delete('/article/:id',  articleController.deleteArticle);

	// Search
	router.post('/articles/search', articleController.searchArticle);
}