const errorHandler = require('../util/errorHandler');
const categoryModel = require('../model').categoryModel;

module.exports = {
    // CRUD
    async createCategory(req, res) {
        try {
            let result = await categoryModel.createCategory(req.body);

            res.status(201).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getCategoryById(req, res) {
        try {
            let result = await categoryModel.getCategoryById(req.params.id);
            
            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getCategories(req, res) {
        try {
            let results = await categoryModel.getCategories();
        
            res.status(200).send(results);
        } catch (error) {
           errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async updateCategory(req, res) {
        try {
            let category = {...req.body, category_id: req.params.id};
            let result = await categoryModel.updateCategory(category);

            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async deleteCategory(req, res) {
        try {
            await categoryModel.deleteCategory(req.params.id);
            
            res.status(200).send('Ok');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },
    // End of CRUD Operations
}