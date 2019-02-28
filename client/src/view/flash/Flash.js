var flashTemplate = require('./template/flash.hbs');

import {View} from 'backbone.marionette';

var FlashView = View.extend({
  template: flashTemplate,

  events: {
    'click #close-button': 'close'
  },

  onRender () {
    this.$el.addClass('alert-' + this.model.attributes.type);
    this.$el.focus();
  },

  onAttach () {
    setTimeout(() => {
      this.close();
    }, 3000);
  },

  close () {
    this.model.destroy();
  }

});

export default FlashView;
