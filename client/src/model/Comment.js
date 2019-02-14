import Backbone from 'backbone';

var CommentModel = Backbone.Model.extend({
  defaults: {
    comment_id: null,
    content: null,
    user_id: null,
    name: null,
    article_id: null,
    createdAt: null
  },
  idAttribute: 'comment_id',

  urlRoot: 'http://localhost:3000/comment'
});

export default CommentModel;
