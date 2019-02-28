import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
// eslint-disable-next-line node/no-extraneous-require
const uuidv1 = require('uuid/v1');
var userCreateTemplate = require('./template/userCreate.hbs');

var UserView = View.extend({
  events: {
    submit: 'saveUser',
    'click #cancel-button': 'cancel'
  },

  template: userCreateTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  flashChannel: Radio.channel('flash-channel'),
  imgChannel: Radio.channel('img-channel'),

  cancel (e) {
    e.preventDefault();
    this.model.destroy();

    this.mainChannel.request('show:articles:view');
  },

  saveUser (e) {
    e.preventDefault();

    var values = {};
    var file = document.getElementById('inputImage').files[0];

    if (file)
      if (file.type.match('image.*')) {
        console.log({file});
        file.uniqId = uuidv1();
        this.imgChannel.request('sync:img', file);
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

    values.img = file.uniqId;

    this.model.save(values);
    this.mainChannel.request('show:users:view');
  }
});

export default UserView;
