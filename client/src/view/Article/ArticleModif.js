import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
var articleModifTemplate = require('./template/articleModif.hbs');

var ArticleModifView = View.extend({
  events: {
    'click #save-button': 'saveArticle'
  },

  regions: {
    main: '.article-region'
  },

  className: '.modif-article',

  template: articleModifTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

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

    this.model.save(values);
  }
});

export default ArticleModifView;
