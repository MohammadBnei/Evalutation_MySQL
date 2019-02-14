import Backbone from 'backbone';
import CommentModel from '../model/Comment';

var Comments = Backbone.Collection.extend({
  url: 'http://localhost:3000/comments/',

  initialize () {
    _.bindAll(this, 'fetchCommentsByUser', 'fetchCommentsByArticle');
  },

  fetchCommentsByUser (id) {
    this.fetch({
      url: this.url + 'user/' + id
    });
  },

  fetchCommentsByArticle (id) {
    this.fetch({
      url: this.url + 'article/' + id
    });
  },

  model: CommentModel
});

export default Comments;
