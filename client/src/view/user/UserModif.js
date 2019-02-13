import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
var userModifTemplate = require('./template/userModif.hbs');

var UserModifView = View.extend({
  events: {
    'click #save-button': 'saveUser'
  },

  regions: {
    main: '.user-region'
  },

  className: '.modif-user',

  template: userModifTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  templateContext () {
    return {
      userCreatedTime: moment(this.model.attributes.createdAt).fromNow()
    };
  },

  initialize () {
    _.bindAll(this, 'saveUser');
  },

  saveUser (e) {
    e.stopPropagation();

    var values = {};

    this.$('#creation-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    this.model.save(values);
  }
});

export default UserModifView;
