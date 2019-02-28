const errorHandler = require('../util/errorHandler');
const userModel = require('../model').userModel;

module.exports = {
    // CRUD
    async createUser(req, res) {
        try {
            result = await userModel.createUser(req.body);

            if (result.length) result = result[0];

            res.status(201).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getUserById(req, res) {
        try {
            let result = await userModel.getUserById(req.params.id);

            if (result.length) result = result[0];
            result.password = null;
            
            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getUsers(req, res) {
        try {
            let results = await userModel.getUsers();
            results.forEach(user => {
                user.password = null;
            });
        
            res.status(200).send(results);
        } catch (error) {
           errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async updateUser(req, res) {
        try {
            let user = {...req.body, user_id: req.params.id};
            let result = await userModel.updateUser(user);

            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async deleteUser(req, res) {
        try {
            await userModel.deleteUser(req.params.id);
            
            res.status(200).send('Ok');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },
    // End of CRUD Operations

    async searchUser(req, res) {
        var words = req.body.words;

        try {
            let results = await userModel.searchUser(words);

            res.status(200).send(results);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    }
}