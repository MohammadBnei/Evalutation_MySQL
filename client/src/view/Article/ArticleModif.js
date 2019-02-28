import {View} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
var articleModifTemplate = require('./template/articleModif.hbs');
// eslint-disable-next-line node/no-extraneous-require
const uuidv1 = require('uuid/v1');

var ArticleModifView = View.extend({
  events: {
    submit: 'saveArticle'
  },

  triggers: {
    'click #cancel-button': 'click:cancel'
  },

  className: '.modif-article',

  template: articleModifTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  categoryChannel: Radio.channel('category-channel'),
  flashChannel: Radio.channel('flash-channel'),
  imgChannel: Radio.channel('img-channel'),

  templateContext () {
    return {
      articlePostTime: moment(this.model.attributes.createdAt).format('lll'),
      categories: this.categoryChannel.request('get:categories').models
    };
  },

  initialize () {
    _.bindAll(this, 'saveArticle');
  },

  saveArticle (e) {
    e.preventDefault();

    var values = {};
    var file = document.getElementById('inputImage').files[0];

    if (file)
      if (file.type.match('image.*')) {
        file.uniqId = uuidv1() + file.name.match(/\.([A-z])\w+/gi);
        this.imgChannel.request('replace:img', {image: file, old: this.model.attributes.img});
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

    // eslint-disable-next-line camelcase
    values.user_id = this.sessionChannel.request('get:user').attributes.user_id;

    let categories = this.categoryChannel.request('get:categories:id:by:name', $('#categories-input').val());

    values.categories = categories;

    this.model.save(values);

    this.trigger('click:cancel');
  }
});

export default ArticleModifView;
