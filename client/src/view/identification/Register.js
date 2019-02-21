import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
import User from '../../model/User';
var registerTemplate = require('./template/register.hbs');

var RegisterView = View.extend({
  events: {
    submit: 'register',
    'click #login-button': 'login'
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  template: registerTemplate,

  register (e) {
    e.preventDefault();
    var values = {};

    this.$('#register-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    var newUser = new User(values);

    newUser.save(null, {
      success: () => this.sessionChannel.request('login', {
        email: values.email,
        password: values.password
      })
    });
  },

  login (e) {
    e.preventDefault();
    this.viewManagerChannel.request('show:login:view');
  }
});

export default RegisterView;
