import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import ArticleDetail from './ArticleDetail';
var articleTemplate = require('./template/article.hbs');

var ArticleView = View.extend({
  events: {
    'click .card': 'goToDetailView'
  },

  childViewEvents: {
    'click:close': 'render'
  },

  regions: {
    main: '.article-region'
  },

  template: articleTemplate,

  templateContext () {
    return {
      articlePostTime: moment(this.model.attributes.createdAt).fromNow()
    };
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  articleChannel: Radio.channel('article-channel'),

  initialize () {
    this.listenTo(this.articleChannel, 'click:card', this.render, this);
  },

  goToDetailView () {
    this.articleChannel.trigger('click:card');
    this.showChildView('main', new ArticleDetail({model: this.model}));
  }
});

export default ArticleView;
