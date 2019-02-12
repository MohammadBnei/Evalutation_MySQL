import Backbone from 'backbone';
import Article from '../model/Article';
import Radio from 'backbone.radio';

var Articles = Backbone.Collection.extend({
  url: 'http://localhost:3000/articles',
  model: Article,

  globalChannel: Radio.channel('global-channel'),

  events: {
    'change add': 'onAdd'
  },

  onAdd () {
    console.log('Article added !');
    this.globalChannel.trigger('show:articles:view');
  }
});

export default Articles;
