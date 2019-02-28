import Backbone from 'backbone';
import Radio from 'backbone.radio';

var CommentModel = Backbone.Model.extend({
  defaults: {
    comment_id: null,
    content: null,
    user_id: null,
    name: null,
    article_id: null,
    createdAt: null
  },

  initialize () {
    this.on('destroy', this.onDestroy, this);
  },

  idAttribute: 'comment_id',
  urlRoot: 'http://localhost:3000/comment',

  onDestroy () {
    Radio.channel('flash-channel').request('new:flash', {
      type: 'info',
      message: 'Comment removed !'
    });
  },

  save (content, options) {
    Backbone.Model.prototype.save.call(this, {
      comment_id: this.get('comment_id'),
      content
    }, options);
  }
});

export default CommentModel;
