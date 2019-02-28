import {MnObject} from 'backbone.marionette';
import _ from 'underscore';
import User from '../model/User';
import Radio from 'backbone.radio';

var SessionChannel = MnObject.extend({
  defaults: {
    user: null,
    cookie: null,
    token: null
  },

  channelName: 'session-channel',
  mainChannel: Radio.channel('main-channel'),
  flashChannel: Radio.channel('flash-channel'),

  radioRequests: {
    'get:token': 'onGetToken',
    'get:user': 'onGetUser',
    'is:loggedIn': 'onIsLoggedIn',
    'is:admin': 'onIsAdmin',
    login: 'onLogin',
    logout: 'onLogout'
  },

  initialize () {
    _.bindAll(this, 'serverLogin', 'serverLogout');

    var token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=([^;]*).*$)|^.*$/, '$1');
    var user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (token && user_id) {
      this.token = token;
      this.user = new User({user_id});
      this.user.fetch({
        success: () => {
          this.getChannel().trigger('loggedIn');
        }
      });
    }
  },

  url: 'http://localhost:3000/session/',

  onLogin (user) {
    if (! user.email || ! user.password) return;

    Backbone.ajax({
      url: this.url + 'signin',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(user),
      xhrFields: {
        withCredentials: false
      },
      success: this.serverLogin,
      error: (error) => console.error(error)
    });
  },

  register (user) {
    if (! user.email || ! user.password) return;

    Backbone.ajax({
      url: this.url + 'signup',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      type: 'POST',
      data: JSON.stringify(user),
      success: this.serverLogin,
      error: (error) => console.error(error)
    });
  },

  onLogout () {
    this.serverLogout();
  },

  serverLogin (res) {
    if (! res) return;

    this.user = new User(res.user);
    this.token = res.token;

    document.cookie = 'token=' + this.token;
    document.cookie = 'user_id=' + res.user.user_id;

    this.mainChannel.request('show:articles:view');
    this.getChannel().trigger('loggedIn');
    this.flashChannel.request('new:flash', {
      message: 'Logged in !',
      type: 'success'
    });
  },

  serverLogout () {
    this.user = null;
    this.token = null;

    this.deleteAllCookies();

    this.mainChannel.request('show:login:view');
    this.getChannel().trigger('loggedOut');
  },

  deleteAllCookies () {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i ++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > - 1 ? cookie.substr(0, eqPos) : cookie;

      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  onGetToken () {
    return this.token;
  },

  onGetUser () {
    if (! this.user) return false;
    return this.user;
  },

  onIsLoggedIn () {
    if (this.token) return true;
    return false;
  },

  onIsAdmin () {
    return this.user.attributes.isAdmin;
  }
});

export default SessionChannel;
