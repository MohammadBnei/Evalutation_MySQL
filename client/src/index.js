import Backbone from 'backbone';
import Radio from 'backbone.radio';
import {Application} from 'backbone.marionette';
import Articles from './collection/Articles';
import LoginView from './view/Login';
import RegisterView from './view/Register';
import ArticlesView from './view/Articles';
import ArticleModifView from './view/ArticleModif';
import SessionChannel from './channel/Session';

var Collection = {
  Articles: new Articles()
};

var View = {
  Login: new LoginView(),
  Register: new RegisterView(),
  Articles: () => {
    Collection.Articles.fetch();
    return new ArticlesView({collection: Collection.Articles});
  },
  ArticleModif: new ArticleModifView()
};

const MyApp = Application.extend({
  region: '#root-element',

  channelName: 'global-channel',

  sessionChannel: new SessionChannel(),

  radioEvents: {
    'show:register:view': 'onShowRegisterView',
    'show:login:view': 'onShowLoginView',
    'show:articles:view': 'onShowArticlesView',
    'show:articleModif:view': 'onShowArticleModifView'
  },

  onStart () {
    this.showView(View.Login);
    Backbone.history.start({
      pushState: true
    });
  },

  onShowRegisterView () {
    this.showView(View.Register);
  },

  onShowLoginView () {
    this.showView(View.Login);
  },

  onShowArticlesView () {
    console.log(View.Articles, Collection.Articles);
    this.showView(View.Articles);
  },

  onShowArticleModifView () {
    this.showView(View.ArticleModif);
  }
});

const myApp = new MyApp();

// Overwriting backbone sync method
var sync = Backbone.sync;

Backbone.sync = (method, model, options) => {
  if (model && (method === 'create' || method === 'update' || method === 'patch')) {
    options.contentType = 'application/json';
    options.data = JSON.stringify(options.attrs || model.toJSON());
  }

  let token = Radio.channel('session-channel').request('get:token');

  _.extend(options, {
    beforeSend: (xhr) => {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
  });

  return sync.call(this, method, model, options);
};

myApp.start();
