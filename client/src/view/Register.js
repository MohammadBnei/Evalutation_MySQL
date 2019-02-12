import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
var registerTemplate = require('../template/register.hbs');

var RegisterView = View.extend({
  events: {
    submit: 'register',
    'click #login-button': 'login'
  },

  initialize () {
    console.log('register view created');
    this.viewManagerChannel = Radio.channel('global-channel');
  },

  template: registerTemplate,

  register (e) {
    e.preventDefault();
    var values = {};

    this.$('#register-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    console.log(values);
  },

  login (e) {
    e.preventDefault();
    this.viewManagerChannel.trigger('show:login:view');
  }
});

export default RegisterView;
