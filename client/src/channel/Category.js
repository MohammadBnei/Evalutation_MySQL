import {MnObject} from 'backbone.marionette';

var CategoryChannel = MnObject.extend({
  default: {
    categories: null
  },

  initialize () {
    this.categories.fetch();
  },
  channelName: 'category-channel',

  radioEvents: {
    'connect:category': (msg) => console.log(`${msg} connected to category channel`)
  },

  radioRequests: {
    'get:categories': 'onGetCategories',
    'get:category': 'onGetCategory'
  }
});

export default CategoryChannel;
