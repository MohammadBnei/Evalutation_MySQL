import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import ArticleModifView from './ArticleModif';
//import CommentsView from '../comment/Comments';
import Comments from '../../collection/Comments';
import CommentsView from '../comment/Comments';
var articleDetailTemplate = require('./template/articleDetail.hbs');

var ArticleDetailView = View.extend({
  initialize () {
    this.comments = new Comments();
    this.comments.fetchCommentsByArticle(this.model.attributes.article_id);
    this.showChildView('comments', new CommentsView({collection: this.comments}));
  },

  events: {
    'click #remove-button': 'removeArticle',
    'click #modify-button': 'modifyArticle'
  },

  triggers: {
    'click #close-button': 'click:close'
  },

  regions: {
    main: '.article-region',
    comments: '.comment-region'
  },

  template: articleDetailTemplate,

  templateContext () {
    return {
      articlePostTime: moment(this.model.attributes.createdAt).fromNow(),
      isCreator: () => this.model.attributes.user_id === this.sessionChannel.request('get:user').user_id
    };
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  articleChannel: Radio.channel('article-channel'),

  removeArticle () {
    this.model.destroy();
  },

  modifyArticle () {
    this.showChildView('main', new ArticleModifView({model: this.model}));
  }
});

export default ArticleDetailView;
