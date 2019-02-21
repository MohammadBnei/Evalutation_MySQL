import {CollectionView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import UserView from './User';

var UsersView = CollectionView.extend({
  collectionEvents: {
    sync: 'render'
  },

  childView: UserView,

  sessionChannel: Radio.channel('session-channel'),

  initialize () {
    console.log('User view created');
  }
});

export default UsersView;
