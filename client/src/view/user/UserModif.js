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

  triggers: {
    'click #cancel-button': 'click:close'
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
      userCreatedTime: moment(this.model.attributes.createdAt).format('lll'),
      isAdmin: this.sessionChannel.request('get:user').get('isAdmin')
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
        file.uniqId = uuidv1() + file.name.match(/\.([A-z])\w+/gi);
        this.imgChannel.request('replace:img', {image: file, old: this.model.attributes.img});
        values.img = file.uniqId;
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

    this.model.save(values, {
      success: () => {
        this.flashChannel.request('new:flash', {
          type: 'success',
          message: 'User modified !'
        });
        this.mainChannel.request('show:articles:view');
      }
    });
  }
});

export default UserModifView;
