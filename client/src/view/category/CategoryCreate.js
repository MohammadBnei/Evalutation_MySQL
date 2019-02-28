import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
var categoryCreateTemplate = require('./template/categoryModif.hbs');

var CategoryCreate = View.extend({
  events: {
    submit: 'saveCategory'
  },

  triggers: {
    'click #cancel-button': 'click:close'
  },

  template: categoryCreateTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  categoryChannel: Radio.channel('category-channel'),

  saveCategory (e) {
    e.preventDefault();

    var values = {};

    this.$('#category-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    this.categoryChannel.request('add:category', values);

    this.mainChannel.request('show:articles:view');
  }
});

export default CategoryCreate;
