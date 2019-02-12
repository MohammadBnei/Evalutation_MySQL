import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
var articleTemplate = require('../template/article.hbs');

var ArticleView = View.extend({
  events: {
    'click #modify-button': 'goToModifyView',
    'click #remove-button': 'removeArticle'
  },

  template: articleTemplate,

  sessionChannel: Radio.channel('session-channel'),
  globalChannel: Radio.channel('global-channel'),

  templateContext () {
    return {
      articlePostTime: moment(this.model.attributes.createdAt).fromNow(),
      isCreator: () => this.model.attributes.user_id === this.sessionChannel.request('get:user').user_id
    };
  },

  initialize () {
    _.bindAll(this, 'removeArticle');
    console.log('Article view', JSON.stringify(this.model));
  },

  removeArticle (e) {
    e.stopPropagation();
    console.log({model: this.model});
    this.model.destroy();
  },

  goToModifyView (e) {
    e.preventDefault();

    this.globalChannel.trigger('show:articleModif:view');
  }
});

export default ArticleView;
