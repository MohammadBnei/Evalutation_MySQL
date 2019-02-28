import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
// eslint-disable-next-line node/no-extraneous-require
const uuidv1 = require('uuid/v1');
var userCreateTemplate = require('./template/userCreate.hbs');

var UserView = View.extend({
  events: {
    submit: 'saveUser'
  },

  triggers: {
    'click #cancel-button': 'click:close'
  },

  template: userCreateTemplate,

  templateContext () {
    return {
      isAdmin: this.sessionChannel.request('get:user').get('isAdmin')
    };
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  flashChannel: Radio.channel('flash-channel'),
  imgChannel: Radio.channel('img-channel'),

  saveUser (e) {
    e.preventDefault();

    var values = {};
    var file = document.getElementById('inputImage').files[0];

    if (file)
      if (file.type.match('image.*')) {
        file.uniqId = uuidv1() + file.name.match(/\.([A-z])\w+/gi);
        this.imgChannel.request('sync:img', file);
        values.img = file.uniqId;
      } else {
        this.flashChannel.request('new:flash', {
          type: 'danger',
          message: 'There is an error with your file'
        });
        return;
      }

    this.$('#creation-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    this.model.save(values, {
      success: () => {
        this.flashChannel.request('new:flash', {
          type: 'success',
          message: 'User created !'
        });
        this.mainChannel.request('show:users:view');
      }
    });
  }
});

export default UserView;
