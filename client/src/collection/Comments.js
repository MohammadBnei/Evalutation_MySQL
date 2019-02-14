import Backbone from 'backbone';
import CommentModel from '../model/Comment';
import moment from 'moment';

var Comments = Backbone.Collection.extend({
  url: 'http://localhost:3000/comments/',

  initialize () {
    _.bindAll(this, 'fetchCommentsByUser', 'fetchCommentsByArticle');
  },

  comparator: (a, b) => moment(a.attributes.createdAt).isAfter(moment(b.attributes.createdAt)) ? - 1 : 1,

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
