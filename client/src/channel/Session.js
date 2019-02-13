import {MnObject} from 'backbone.marionette';
import _ from 'underscore';
import User from '../model/User';
import Radio from 'backbone.radio';

var SessionChannel = MnObject.extend({
  defaults: {
    loggedIn: false,
    user: null,
    cookie: null,
    token: null
  },

  channelName: 'session-channel',
  mainChannel: Radio.channel('main-channel'),

  radioEvents: {
    'connect:session': (msg) => console.log(`${msg} connected to session`)
  },

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
    console.log('Session created!');
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
    Backbone.ajax({
      url: this.url + 'signout',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      type: 'POST',
      success: this.serverLogout,
      error: (error, text) => console.error(text, {error})
    });
  },

  serverLogin (res) {
    if (! res) return;

    this.user = new User(res.user);
    this.token = res.token;

    this.mainChannel.request('show:articles:view');
    this.getChannel().trigger('loggedIn');
  },

  serverLogout () {
    this.user = null;
    this.token = null;

    this.mainChannel.request('show:login:view');
    this.getChannel().trigger('loggedOut');
  },

  onGetToken () {
    return this.token;
  },

  onGetUser () {
    return this.user.attributes;
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
