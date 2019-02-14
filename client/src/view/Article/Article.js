import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import ArticleDetail from './ArticleDetail';
import CommentModel from '../../model/Comment';
var articleTemplate = require('./template/article.hbs');

var ArticleView = View.extend({
  events: {
    'click #showDetail': 'goToDetailView',
    'click #save-comment': 'saveComment'
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
    this.listenTo(this.articleChannel, 'click:showDetail', this.render, this);
  },

  goToDetailView () {
    this.articleChannel.trigger('click:showDetail');
    this.showChildView('main', new ArticleDetail({model: this.model}));
  },

  saveComment (e) {
    e.preventDefault();

    var newComment = new CommentModel({
      content: this.$('#comment-input').val(),
      user_id: this.sessionChannel.request('get:user').user_id,
      article_id: this.model.attributes.article_id
    });

    newComment.save();
    this.model.collection.add(newComment);
  }
});

export default ArticleView;
