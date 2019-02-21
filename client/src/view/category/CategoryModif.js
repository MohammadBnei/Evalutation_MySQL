import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
var categoryModifTemplate = require('./template/categoryModif.hbs');

var CategoryModifView = View.extend({
  events: {
    'click #save-button': 'saveCategory'
  },

  template: categoryModifTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  saveCategory (e) {
    e.preventDefault();

    var values = {};

    this.$('#category-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    this.model.save(values);
  }
});

export default CategoryModifView;
