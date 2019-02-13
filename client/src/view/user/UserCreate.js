import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
//import userModif from './UsereModif';
var userCreateTemplate = require('./template/userCreate.hbs');

var UserView = View.extend({
  events: {
    submit: 'saveUser',
    'click #cancel-button': 'cancel'
  },

  template: userCreateTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  cancel (e) {
    e.preventDefault();
    this.model.destroy();

    this.mainChannel.request('show:articles:view');
  },

  saveUser (e) {
    e.preventDefault();

    var values = {};

    this.$('#creation-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    console.log({values});

    this.model.save(values);
  }
});

export default UserView;
