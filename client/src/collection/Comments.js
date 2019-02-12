import Backbone from 'backbone';
import Comment from '../model/Comment';

var Comments = Backbone.Collection.extend({
  model: Comment
});

module.exports = Comments;
