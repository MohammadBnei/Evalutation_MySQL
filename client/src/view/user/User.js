import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import UserModif from './UserModif';
//import userModif from './UsereModif';
var userTemplate = require('./template/user.hbs');

var UserView = View.extend({
  events: {
    'click #modify-button': 'goToModifyView',
    'click #remove-button': 'removeUser',
    'click #cancel-button': 'render'
  },

  regions: {
    main: '.user-region'
  },

  template: userTemplate,

  templateContext () {
    return {
      userCreatedTime: moment(this.model.attributes.createdAt).fromNow(),
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
  }
});

export default UserView;
