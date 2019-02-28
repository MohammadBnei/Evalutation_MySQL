import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import UserModif from './UserModif';
import CommentsView from '../comment/Comments';
import Comments from '../../collection/Comments';
var userTemplate = require('./template/user.hbs');

var UserView = View.extend({
  events: {
    'click #modify-button': 'goToModifyView',
    'click #remove-button': 'removeUser',
    'click #comments-button': 'goToComments'
  },

  childViewEvents: {
    'click:close': 'render'
  },

  regions: {
    main: '.user-region',
    comments: '#comments-region'
  },

  template: userTemplate,

  templateContext () {
    return {
      userCreatedTime: moment(this.model.attributes.createdAt).format('lll'),
      modify: () => {
        if (this.model.attributes.user_id === this.sessionChannel.request('get:user').attributes.user_id) return true;
        if (! this.model.attributes.isAdmin) return true;
        return false;
      }
    };
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  removeUser (e) {
    e.stopPropagation();
    this.model.destroy();
  },

  goToModifyView () {
    this.showChildView('main', new UserModif({model: this.model}));
  },

  goToComments () {
    var comments = new Comments();

    comments.fetchCommentsByUser(this.model.get('user_id'));
    this.showChildView('comments', new CommentsView({collection: comments}));
  }
});

export default UserView;
