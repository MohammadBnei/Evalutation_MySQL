import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
var articleCreateTemplate = require('./template/articleModif.hbs');
// eslint-disable-next-line node/no-extraneous-require
const uuidv1 = require('uuid/v1');

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
  flashChannel: Radio.channel('flash-channel'),
  imgChannel: Radio.channel('img-channel'),

  cancel (e) {
    e.preventDefault();
    this.model.destroy();

    this.mainChannel.request('show:articles:view');
  },

  saveArticle (e) {
    e.preventDefault();

    var values = {};
    var file = document.getElementById('inputImage').files[0];

    if (file)
      if (file.type.match('image.*')) {
        file.uniqId = uuidv1() + file.name.match(/\.([A-z])\w+/gi);
        this.imgChannel.request('sync:img', file);
        values.img = file.uniqId;
      } else {
        this.flashChannel.request('new:flash', {
          type: 'danger',
          message: 'There is an error with your file'
        });
        return;
      }

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
