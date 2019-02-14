import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
var commentTemplate = require('./template/comment.hbs');

var CommentView = View.extend({
  events: {
    'click #remove-comment-button': 'removeComment'
  },

  template: commentTemplate,

  templateContext () {
    return {
      commentPostTime: moment(this.model.attributes.createdAt).fromNow(),
      isAdmin: this.sessionChannel.request('get:user').isAdmin
    };
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  commentChannel: Radio.channel('comment-channel'),

  removeComment () {
    this.model.destroy();
    this.destroy();
  }
});

export default CommentView;
