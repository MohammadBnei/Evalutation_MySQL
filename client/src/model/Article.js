import Backbone from 'backbone';
import Radio from 'backbone.radio';

var Article = Backbone.Model.extend({
  defaults: {
    article_id: null,
    user_id: null,
    title: null,
    content: null,
    img: null
  },

  initialize () {
    this.on('sync', this.onSync, this);
  },

  idAttribute: 'article_id',
  urlRoot: 'http://localhost:3000/article',

  onSync () {
    Radio.channel('main-channel').request('show:articles:view');
  }
});

export default Article;
