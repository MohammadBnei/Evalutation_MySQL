import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
var categoryCreateTemplate = require('./template/categoryModif.hbs');

var CategoryCreate = View.extend({
  events: {
    'click #save-button': 'saveCategory'
  },

  template: categoryCreateTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  saveCategory (e) {
    e.preventDefault();

    var values = {};

    this.$('#category-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    this.model.save(values, {
      success: this.mainChannel.request('show:articles:view')
    });
  }
});

export default CategoryCreate;
