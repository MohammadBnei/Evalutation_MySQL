import {MnObject} from 'backbone.marionette';
import _ from 'underscore';
import User from '../model/User';
import Radio from 'backbone.radio';

var SessionChannel = MnObject.extend({
  defaults: {
    loggedIn: false,
    user: new User(),
    isAdmin: null,
    cookie: null,
    token: null
  },

  channelName: 'session-channel',

  radioEvents: {
    'connect:session': (msg) => console.log(`${msg} connected to session`)
  },

  radioRequests: {
    'get:token': 'onGetToken',
    'get:user': 'onGetUser',
    login: 'login',
    logout: 'logout'
  },

  initialize () {
    _.bindAll(this, 'serverLogin');
    console.log('Session created!');
  },

  url: 'http://localhost:3000/session/',

  login (user) {
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

  logout () {
    Backbone.ajax({
      url: this.url + 'signout',
      contentType: 'application/json',
      headers: {
        Xtest: 'bar'
      },
      xhrFields: {
        withCredentials: true
      },
      type: 'POST',
      error: (error, text) => console.error(text, {error})
    });
  },

  serverLogin (res) {
    if (! res) return;

    this.user = res.user;
    this.token = res.token;

    Radio.channel('global-channel').trigger('show:articles:view');
  },

  onGetToken () {
    return this.token;
  },

  onGetUser () {
    return this.user;
  }
});

export default SessionChannel;
