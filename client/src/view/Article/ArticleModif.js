import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
var articleModifTemplate = require('./template/articleModif.hbs');

var ArticleModifView = View.extend({
  events: {
    submit: 'saveArticle'
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
    e.preventDefault();

    var values = {};

    this.$('form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    // eslint-disable-next-line camelcase
    values.user_id = this.sessionChannel.request('get:user').user_id;

    this.model.save(values);
  }
});

export default ArticleModifView;
