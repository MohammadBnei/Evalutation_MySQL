import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Mn from 'backbone.marionette';
import LoginView from '../view/identification/Login';
import RegisterView from '../view/identification/Register';
import ArticlesView from '../view/article/Articles';
import UsersView from '../view/user/Users';
import UserView from '../view/user/User';
import Articles from '../collection/Articles';
import Users from '../collection/Users';
import UserCreate from '../view/user/UserCreate';
import User from '../model/User';
import ArticleCreate from '../view/article/ArticleCreate';
import Article from '../model/Article';
import SessionChannel from '../channel/Session';
import CategoryChannel from '../channel/Category';
import CategoryCreate from '../view/category/CategoryCreate';
import Category from '../model/Category';
import CommentsView from '../view/comment/Comments';
import CategoriesView from '../view/category/Categories';

const MainApp = Mn.Application.extend({
  region: '#content-region',

  channelName: 'main-channel',
  sessionChannel: Radio.channel('sessionChannel'),

  radioRequests: {
    'show:register:view': 'showRegisterView',
    'show:login:view': 'showLoginView',
    'show:articles:view': 'showArticlesView',
    'show:articleModif:view': 'showArticleModifView',
    'show:users:view': 'showUsersView',
    'show:user:creation:view': 'showUserCreationView',
    'show:article:creation:view': 'showArticleCreationView',
    'show:category:creation:view': 'showCategoryCreationView',
    'show:categories:view': 'showCategoriesView',
    'show:informations:view': 'showInformationsView',
    'show:comments:from:user': 'showCommentsFromUser'
  },

  onStart () {
    Backbone.history.start({
      pushState: true
    });
    const sessionChannel = new SessionChannel();
    const categoryChannel = new CategoryChannel();

    this.sessionChannel = sessionChannel.getChannel();
    this.categoryChannel = categoryChannel.getChannel();

    if (this.sessionChannel.request('get:user')) this.showArticlesView();
    else this.showLoginView();
  },

  showRegisterView () {
    this.showView(new RegisterView());
  },

  showLoginView () {
    this.showView(new LoginView());
  },

  showArticlesView (articles) {
    if (! articles) {
      articles = new Articles();
      articles.fetch();
    }
    this.showView(new ArticlesView({collection: articles}));
  },

  showUsersView (users) {
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
  },

  showCategoryCreationView () {
    this.showView(new CategoryCreate({model: new Category()}));
  },

  showInformationsView () {
    this.showView(new UserView({model: this.sessionChannel.request('get:user')}));
  },

  showCommentsFromUser (user) {
    let comments = user.getComments();

    this.showView(new CommentsView({collection: comments}));
  },

  showCategoriesView () {
    this.showView(new CategoriesView({
      collection: this.categoryChannel.request('get:categories'),
      childViewOptions: {showControls: true}
    }));
  }
});

export default MainApp;
