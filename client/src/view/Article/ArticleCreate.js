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

  templateContext () {
    return {
      categories: this.categoryChannel.request('get:categories').models
    };
  },

  regions: {
    main: '.article-region'
  },

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  categoryChannel: Radio.channel('category-channel'),

  cancel (e) {
    e.preventDefault();
    this.model.destroy();

    this.mainChannel.request('show:articles:view');
  },

  saveArticle (e) {
    e.preventDefault();

    var values = {};

    this.$('#article-form').serializeArray().forEach(element => {
      values[element.name] = element.value;
    });

    values.user_id = this.sessionChannel.request('get:user').attributes.user_id;
    let categories = this.categoryChannel.request('get:categories:id:by:name', $('#categories-input').val());

    values.categories = categories;

    this.model.save(values, {
      success: () => this.mainChannel.request('show:articles:view')
    });
  }
});

export default ArticleView;
