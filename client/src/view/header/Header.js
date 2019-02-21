import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
import Articles from '../../collection/Articles';
import Users from '../../collection/Users';
var navbarTempalte = require('./template/navbar.hbs');

var HeaderView = View.extend({
  events: {
    'click #home-link': 'goToArticlesView',
    'click #all-user-link': 'onShowAllUsers',
    'click #add-user-link': 'onAddUser',
    'click #add-article-link': 'onAddArticle',
    'click #add-category-link': 'onAddCategory',
    'click #logout-button': 'onLogout',
    'click #informations-link': 'onShowInformations',
    'click #comments-link': 'onShowComments',
    submit: 'onSearch'
  },

  initialize (categories) {
    this.categories = categories;
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
  },

  onAddUser () {
    this.mainChannel.request('show:user:creation:view');
  },

  onAddArticle () {
    this.mainChannel.request('show:article:creation:view');
  },

  onAddCategory () {
    this.mainChannel.request('show:category:creation:view');
  },

  onShowInformations () {
    this.mainChannel.request('show:informations:view');
  },

  onShowComments () {
    this.mainChannel.request('show:comments:from:user', this.sessionChannel.request('get:user'));
  },

  onSearch (e) {
    e.preventDefault();

    var values = {};

    this.$('#search-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    $('#search-menu').removeClass('show');

    if (values['options-search'] === 'article') this.articleSearch(values.words, null);
    if (values['options-search'] === 'user') this.userSearch(values.words);
  },

  articleSearch (words, category) {
    var articles = new Articles();

    articles.search(words, category);

    this.mainChannel.request('show:articles:view', articles);
  },

  userSearch (words) {
    var users = new Users();

    users.search(words);

    this.mainChannel.request('show:users:view', users);
  }
});

export default HeaderView;
