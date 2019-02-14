import Backbone from 'backbone';

var Article = Backbone.Model.extend({
  defaults: {
    article_id: null,
    user_id: null,
    title: null,
    content: null,
    img: null
  },

  idAttribute: 'article_id',
  urlRoot: 'http://localhost:3000/article'
});

export default Article;
