import Mn from 'backbone.marionette';
import Flashs from '../collection/Flashs';
import FlashsView from '../view/flash/Flashs';

var FlashApp = Mn.Application.extend({
  region: '#flash',

  channelName: 'flash-channel',

  radioRequests: {
    'new:flash': 'onNewFlash'
  },

  onStart () {
    this.flashs = new Flashs();
    this.showView(new FlashsView({
      collection: this.flashs
    }));
  },

  onNewFlash (flash) {
    this.flashs.unshift(flash);
  }
});

export default FlashApp;
