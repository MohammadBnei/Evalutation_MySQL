import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
var articleModifTemplate = require('../template/articleModif.hbs');

var ArticleModifView = View.extend({
  events: {
    'click #validate-button': 'saveArticle',
    'click #cancel-button': 'cancel'
  },

  template: articleModifTemplate,

  sessionChannel: Radio.channel('session-channel'),
  globalChannel: Radio.channel('global-channel'),

  templateContext () {
    return {
      articlePostTime: moment(this.model.attributes.createdAt).fromNow()
    };
  },

  initialize () {
    _.bindAll(this, 'saveArticle');
  },

  saveArticle (e) {
    e.stopPropagation();

    var values = {};

    this.$('#creation-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    this.collection.add([values]);
  },

  goToModifyView (e) {
    e.preventDefault();

    this.globalChannel.trigger('show:articleModif:view');
  }
});

export default ArticleModifView;
