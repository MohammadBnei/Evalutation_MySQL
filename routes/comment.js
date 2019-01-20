const commentController = require('../controller/').commentController;
//var passport = require('passport');

module.exports = (router) => {
	// Create a comment in the database and return it 
	router.post('/comment', commentController.createComment);

	// Seach for a comment by its id
	router.get('/comment/:id', commentController.getCommentById);

	// Get all comments
	router.get('/comments', commentController.getComments);

	// Update a comment (will update every parameters present in the JSON object passed)
	router.put('/comment', commentController.updateComment);

	// Delete an comment by its id
	router.delete('/comment/:id', commentController.deleteComment);

	// Get all comments from an user (if parameters empty, will use the session's user)
	router.get('/comments/user/:id', commentController.getCommentsByUser);

	// Get all comments from an article
	router.get('/comments/article/:id', commentController.getCommentsByArticle);
}