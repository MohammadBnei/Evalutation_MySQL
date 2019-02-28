import {CollectionView} from 'backbone.marionette';
import ArticleView from './Article';

var ArticlesView = CollectionView.extend({
  collectionEvents: {
    sync: 'render'
  },

  childView: ArticleView
});

export default ArticlesView;
