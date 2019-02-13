import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import ArticleModif from './ArticleModif';
var articleTemplate = require('./template/article.hbs');

var ArticleView = View.extend({
  events: {
    'click #modify-button': 'goToModifyView',
    'click #remove-button': 'removeArticle',
    'click #cancel-button': 'render'
  },

  regions: {
    main: '.article-region'
  },

  template: articleTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  templateContext () {
    return {
      articlePostTime: moment(this.model.attributes.createdAt).fromNow(),
      isCreator: () => this.model.attributes.user_id === this.sessionChannel.request('get:user').user_id
    };
  },

  initialize () {
    _.bindAll(this, 'removeArticle');
  },

  removeArticle (e) {
    e.stopPropagation();
    this.model.destroy();
  },

  goToModifyView () {
    this.showChildView('main', new ArticleModif({model: this.model}));
  }
});

export default ArticleView;
