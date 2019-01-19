const user = require('./user');
const common = require('./common');
const comment = require('./comment');
const article = require('./article');

module.exports = (router) => {
    user(router),
    common(router),
    comment(router),
    article(router)
}