import HeaderView from '../view/header/Header';
import Radio from 'backbone.radio';
import Mn from 'backbone.marionette';

var HeaderApp = Mn.Application.extend({
  region: '#header-region',

  channelName: 'header-channel',
  sessionChannel: Radio.channel('session-channel'),
  categoryChannel: Radio.channel('category-channel'),

  onStart () {
    this.listenTo(this.sessionChannel, 'loggedIn', this.showHeader, this);
    this.listenTo(this.sessionChannel, 'loggedIOut', this.hideHeader, this);
  },

  async showHeader () {
    this.showView(new HeaderView(this.categoryChannel.request('get:categories')));
  },

  hideHeader () {
    this.getRegion().destroy();
  }
});

export default HeaderApp;
