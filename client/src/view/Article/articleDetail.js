import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import ArticleModifView from './ArticleModif';
import CommentModel from '../../model/Comment';
import Comments from '../../collection/Comments';
import CommentsView from '../comment/Comments';
import CategoriesView from '../category/Categories';
// eslint-disable-next-line node/no-extraneous-require
const uuidv1 = require('uuid/v1');

var articleDetailTemplate = require('./template/articleDetail.hbs');

var ArticleDetailView = View.extend({
  initialize () {
    this.comments = new Comments();
    this.comments.fetchCommentsByArticle(this.model.attributes.article_id);
    this.showChildView('comments', new CommentsView({collection: this.comments}));
  },

  onRender () {
    this.categories = this.categoryChannel.request('get:category:article', this.model.attributes.categories);
    this.showChildView('article-category', new CategoriesView({
      collection: this.categories,
      childViewOptions: {showControls: false}
    }));
  },

  events: {
    'click #remove-button': 'removeArticle',
    'click #modify-button': 'modifyArticle',
    'click #save-comment': 'saveComment'
  },

  triggers: {
    'click #close-button': 'click:close'
  },

  childViewEvents: {
    'click:cancel': 'render'
  },

  regions: {
    main: '.article-region',
    comments: '.comment-region',
    'article-category': '.article-category-region'
  },

  template: articleDetailTemplate,

  templateContext () {
    return {
      articlePostTime: moment(this.model.attributes.createdAt).format('LLLL'),
      isCreator: () => this.model.attributes.user_id === this.sessionChannel.request('get:user').get('user_id'),
      viewId: uuidv1()
    };
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  articleChannel: Radio.channel('article-channel'),
  categoryChannel: Radio.channel('category-channel'),

  removeArticle () {
    this.model.destroy();
  },

  modifyArticle () {
    this.showChildView('main', new ArticleModifView({model: this.model}));
  },

  saveComment (e) {
    e.preventDefault();

    var user = this.sessionChannel.request('get:user').attributes;
    var content = $('#comment-input').val();

    var newComment = new CommentModel({
      content,
      user_id: user.user_id,
      article_id: this.model.attributes.article_id
    });

    newComment.save(null, {
      success: (model) => {
        $('#write-comment').removeClass('show');
        model.attributes.name = user.name;
        this.comments.add(model);
      }
    });
  }
});

export default ArticleDetailView;
