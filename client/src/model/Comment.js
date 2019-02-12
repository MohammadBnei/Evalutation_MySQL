import Backbone from 'backbone';

var Comment = Backbone.Model.extend({
  defaults: {
    comment_id: 0,
    content: '',
    user_id: 0,
    article_id: 0,
    createdAt: ''
  },
  idAttribute: 'comment_id',
  urlRoot: '/comment'
});

module.exports = Comment;
