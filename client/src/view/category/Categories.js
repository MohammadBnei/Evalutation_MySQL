import {CollectionView} from 'backbone.marionette';
import CategoryView from './Category';

var CategoriesView = CollectionView.extend({
  collectionEvents: {
    'sync change': 'render'
  },

  childView: CategoryView
});

export default CategoriesView;
