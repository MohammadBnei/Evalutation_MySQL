import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
var navbarTempalte = require('../template/navbar.hbs');

var HeaderView = View.extend({
  events: {
    'click #home-link': 'goToArticlesView',
    'click #all-user-link': 'onShowAllUsers',
    'click #logout-button': 'onLogout'
  },

  initialize () {
    this.listenTo(this.sessionChannel, 'loggedIn loggedOut', this.render);
  },

  template: navbarTempalte,

  templateContext () {
    return {
      isAdmin: () => this.sessionChannel.request('is:admin'),
      isLoggedIn: () => this.sessionChannel.request('is:loggedIn')
    };
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  goToArticlesView () {
    this.mainChannel.request('show:articles:view');
  },

  onLogout (e) {
    e.stopPropagation();
    this.sessionChannel.request('logout');
  },

  onShowAllUsers () {
    this.mainChannel.request('show:users:view');
  }
});

export default HeaderView;
