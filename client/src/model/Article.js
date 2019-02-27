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

  events: {
    destroy: 'onDestroy'
  },

  idAttribute: 'article_id',
  urlRoot: 'http://localhost:3000/article',

  onDestroy () {
    Radio.channel('flash-channel').request('new:flash', {
      type: 'info',
      message: 'Article removed !'
    });
  }
});

export default Article;
