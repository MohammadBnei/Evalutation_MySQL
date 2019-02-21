import {CollectionView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import ArticleView from './Article';

var ArticlesView = CollectionView.extend({
  collectionEvents: {
    sync: 'render'
  },

  childView: ArticleView,

  sessionChannel: Radio.channel('session-channel'),
  articleChannel: Radio.channel('article-channel'),

  initialize () {
    console.log('Post view created');
  }
});

export default ArticlesView;
