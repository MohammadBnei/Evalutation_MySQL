import {CollectionView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import ArticleView from './Article';

var ArticlesView = CollectionView.extend({
  collectionEvents: {
    sync: () => console.log('RENDER')
  },

  childView: ArticleView,

  sessionChannel: Radio.channel('session-channel'),

  initialize () {
    console.log('Post view created');
  }
});

export default ArticlesView;
