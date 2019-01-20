const errorHandler = require('../util/errorHandler');
const userModel = require('../model').userModel;

module.exports = {
    // CRUD
    async createUser(req, res) {
        try {
            let result = await userModel.createUser(req.body);

            res.status(201).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getUserById(req, res) {
        try {
            let result = await userModel.getUserById(req.params.id);
            
            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getUsers(req, res) {
        try {
            let results = await userModel.getUsers();
        
            res.status(200).send(results);
        } catch (error) {
           errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async updateUser(req, res) {
        try {
            let result = await userModel.updateUser(req.body);

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
}