import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import CommentModif from './CommentMofif';
var commentTemplate = require('./template/comment.hbs');

var CommentView = View.extend({
  events: {
    'click #remove-comment-button': 'removeComment',
    'click #modify-button': 'modifyComment',
    'click #cancel-button': 'render'
  },

  template: commentTemplate,

  templateContext () {
    return {
      commentPostTime: moment(this.model.attributes.createdAt).format('lll'),
      isAdmin: this.sessionChannel.request('get:user').attributes.isAdmin
    };
  },

  regions: {
    main: '#comment-region'
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  commentChannel: Radio.channel('comment-channel'),

  removeComment () {
    this.model.destroy();
    this.destroy();
  },

  modifyComment () {
    this.showChildView('main', new CommentModif({model: this.model}));
  }
});

export default CommentView;
