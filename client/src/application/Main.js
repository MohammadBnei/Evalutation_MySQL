import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Mn from 'backbone.marionette';
import LoginView from '../view/identification/Login';
import RegisterView from '../view/identification/Register';
import ArticlesView from '../view/article/Articles';
import UsersView from '../view/user/Users';
import Articles from '../collection/Articles';
import Users from '../collection/Users';
import UserCreate from '../view/user/UserCreate';
import User from '../model/User';
import ArticleCreate from '../view/article/ArticleCreate';
import Article from '../model/Article';
import SessionChannel from '../channel/Session';

const MainApp = Mn.Application.extend({
  region: '#content-region',

  channelName: 'main-channel',
  sessionChannel: Radio.channel('sessionChannel'),

  radioRequests: {
    'show:register:view': 'onShowRegisterView',
    'show:login:view': 'onShowLoginView',
    'show:articles:view': 'onShowArticlesView',
    'show:articleModif:view': 'onShowArticleModifView',
    'show:users:view': 'onShowUsersView',
    'show:user:creation:view': 'showUserCreationView',
    'show:article:creation:view': 'showArticleCreationView'
  },

  onStart () {
    Backbone.history.start({
      pushState: true
    });
    const sessionChannel = new SessionChannel();

    this.sessionChannel = sessionChannel.getChannel();

    if (this.sessionChannel.request('get:user')) this.onShowArticlesView();
    else this.onShowLoginView();
  },

  onShowRegisterView () {
    this.showView(new RegisterView());
  },

  onShowLoginView () {
    this.showView(new LoginView());
  },

  onShowArticlesView (articles) {
    if (! articles) {
      articles = new Articles();
      articles.fetch();
    }
    this.showView(new ArticlesView({collection: articles}));
  },

  onShowUsersView (users) {
    if (! users) {
      users = new Users();
      users.fetch();
    }
    this.showView(new UsersView({collection: users}));
  },

  showUserCreationView () {
    this.showView(new UserCreate({model: new User()}));
  },

  showArticleCreationView () {
    this.showView(new ArticleCreate({model: new Article()}));
  }
});

export default MainApp;
