import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';

var loginTemplate = require('./template/login.hbs');

var LoginView = View.extend({
  events: {
    'click #register-button': 'register',
    'click #signin-button': 'login'
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  template: loginTemplate,

  login (e) {
    e.preventDefault();
    var values = {};

    this.$('#login-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });
    this.sessionChannel.request('login', values);
  },

  register (e) {
    e.preventDefault();
    this.mainChannel.request('show:register:view');
  }
});

export default LoginView;
