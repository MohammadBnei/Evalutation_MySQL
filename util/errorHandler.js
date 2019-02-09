module.exports = {
    queryRequestErrorHandler(error, res) {
        console.error(error);
        res.status(400).send(error.message);
    },
    loginErrorHandler(error, res) {
        console.error(error);
        res.status(400).send(error.message);
    }
};
