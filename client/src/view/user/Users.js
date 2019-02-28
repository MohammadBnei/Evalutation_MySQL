import {CollectionView} from 'backbone.marionette';
import UserView from './User';

var UsersView = CollectionView.extend({
  collectionEvents: {
    sync: 'render'
  },

  childView: UserView
});

export default UsersView;
