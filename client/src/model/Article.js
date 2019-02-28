import Backbone from 'backbone';
import Radio from 'backbone.radio';

var Article = Backbone.Model.extend({
  defaults: {
    article_id: null,
    user_id: null,
    title: null,
    content: null,
    img: null,
    categories: null
  },

  initialize () {
    this.on('destroy', this.onDestroy, this);
  },

  idAttribute: 'article_id',
  urlRoot: 'http://localhost:3000/article',

  onDestroy () {
    Radio.channel('flash-channel').request('new:flash', {
      type: 'info',
      message: 'Article removed !'
    });

    Radio.channel('img-channel').request('delete:img', this.get('img'));
  }
});

export default Article;
