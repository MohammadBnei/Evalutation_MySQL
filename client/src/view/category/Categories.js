import {CollectionView} from 'backbone.marionette';
import CategoryView from './Category';
var categoriesTemplate = require('./template/categories.hbs');

var CategoriesView = CollectionView.extend({
  collectionEvents: {
    'sync change': 'render'
  },

  template: categoriesTemplate,

  childView: CategoryView
});

export default CategoriesView;
