import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Mn from 'backbone.marionette';
import LoginView from '../view/identification/Login';
import RegisterView from '../view/identification/Register';
import ArticlesView from '../view/article/Articles';
import UsersView from '../view/user/Users';
import Articles from '../collection/Articles';
import Users from '../collection/Users';

const MainApp = Mn.Application.extend({
  region: '#content-region',

  channelName: 'main-channel',
  sessionChannel: Radio.channel('sessionChannel'),

  radioRequests: {
    'show:register:view': 'onShowRegisterView',
    'show:login:view': 'onShowLoginView',
    'show:articles:view': 'onShowArticlesView',
    'show:articleModif:view': 'onShowArticleModifView',
    'show:users:view': 'onShowUsersView'
  },

  onStart () {
    this.showView(new LoginView());
    Backbone.history.start({
      pushState: true
    });
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
  }
});

export default MainApp;
