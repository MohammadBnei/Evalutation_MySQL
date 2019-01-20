const user = require('./user');
const common = require('./common');
const comment = require('./comment');
const article = require('./article');
const category = require('./category');

module.exports = (router) => {
    user(router),
    common(router),
    comment(router),
    article(router),
    category(router)
}