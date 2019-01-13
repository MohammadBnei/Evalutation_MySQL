const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/', (req, res) => {
	res.render('index', {
		title: 'HeyHey'
	});
});

router.post('/user/create', userController.create);

module.exports = router;