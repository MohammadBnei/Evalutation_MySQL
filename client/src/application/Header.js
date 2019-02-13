import HeaderView from '../view/Header';
import Radio from 'backbone.radio';
import Mn from 'backbone.marionette';

var HeaderApp = Mn.Application.extend({
  region: '#header-region',

  channelName: 'header-channel',
  SessionChannel: Radio.channel('session-channel'),

  onStart () {
    this.showView(new HeaderView());
  }

});

export default HeaderApp;
