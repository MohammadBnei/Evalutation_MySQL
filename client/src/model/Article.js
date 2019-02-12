import Backbone from 'backbone';

var Article = Backbone.Model.extend({
  defaults: {
    article_id: 0,
    user_id: 0,
    clientId: null,
    title: '',
    content: '',
    img: '',
    createdAt: ''
  },
  idAttribute: 'article_id',
  urlRoot: 'http://localhost:3000/article'
});

export default Article;
