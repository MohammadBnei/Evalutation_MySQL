import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
//import userModif from './UsereModif';
var articleCreateTemplate = require('./template/articleModif.hbs');

var ArticleView = View.extend({
  events: {
    submit: 'saveArticle',
    'click #cancel-button': 'cancel'
  },

  template: articleCreateTemplate,

  regions: {
    main: '.article-region'
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  cancel (e) {
    e.preventDefault();
    this.model.destroy();

    this.mainChannel.request('show:articles:view');
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

export default ArticleView;
