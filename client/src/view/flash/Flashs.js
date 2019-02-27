import {CollectionView} from 'backbone.marionette';
import FlashView from './flash';

var FlashsView = CollectionView.extend({
  childView: FlashView
});

export default FlashsView;
