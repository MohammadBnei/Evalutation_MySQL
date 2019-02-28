import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
var userModifTemplate = require('./template/userModif.hbs');
// eslint-disable-next-line node/no-extraneous-require
const uuidv1 = require('uuid/v1');

var UserModifView = View.extend({
  events: {
    submit: 'saveUser'
  },

  regions: {
    main: '.user-region'
  },

  className: '.modif-user',

  template: userModifTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  flashChannel: Radio.channel('flash-channel'),
  imgChannel: Radio.channel('img-channel'),

  templateContext () {
    return {
      userCreatedTime: moment(this.model.attributes.createdAt).fromNow()
    };
  },

  initialize () {
    _.bindAll(this, 'saveUser');
  },

  saveUser (e) {
    e.preventDefault();

    var values = {};
    var file = document.getElementById('inputImage').files[0];

    if (file)
      if (file.type.match('image.*')) {
        file.uniqId = uuidv1();
        this.imgChannel.request('replace:img', file, this.model.attributes.img);
      } else {
        this.flashChannel.request('new:flash', {
          type: 'danger',
          message: 'There is an error with your file'
        });
        return;
      }

    this.$('#modif-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    values.img = file.uniqId;

    this.model.save(values);
  }
});

export default UserModifView;
