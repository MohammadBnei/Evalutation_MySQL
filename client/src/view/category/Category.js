import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
import CategoryModif from './CategoryModif';
var categoryTemplate = require('./template/category.hbs');

var CategoryView = View.extend({
  events: {
    'click #save-button': 'saveCategory',
    'click #remove-button': 'removeCategory',
    'click #cancel-button': 'render',
    'click #modify-button': 'modifyArticle'
  },

  regions: {
    main: '.category-region'
  },

  initialize () {
    console.log('Category view created');
  },

  template: categoryTemplate,

  templateContext () {
    return {
      isAdmin: () => this.sessionChannel.request('get:user').attributes.isAdmin
    };
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  removeCategory (e) {
    e.stopPropagation();
    this.model.destroy();
  },

  modifyArticle () {
    this.showChildView('main', new CategoryModif({model: this.model}));
  }
});

export default CategoryView;
