import {CollectionView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import CommentView from './Comment';

var CommentsView = CollectionView.extend({
  collectionEvents: {
    'sync update': 'render'
  },

  childView: CommentView,

  sessionChannel: Radio.channel('session-channel'),
  articleChannel: Radio.channel('article-channel')
});

export default CommentsView;
