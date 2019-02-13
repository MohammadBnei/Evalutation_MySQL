import Backbone from 'backbone';
import Article from '../model/Article';
import Radio from 'backbone.radio';

var Articles = Backbone.Collection.extend({
  url: 'http://localhost:3000/articles',
  model: Article,

  mainChannel: Radio.channel('main-channel'),

  events: {
    'change add': 'onAdd'
  },

  onAdd () {
    console.log('Article added !');
    this.mainChannel.trigger('show:articles:view');
  }
});

export default Articles;
