import Backbone from 'backbone';
import Article from '../model/Article';
import Radio from 'backbone.radio';
import moment from 'moment';

var Articles = Backbone.Collection.extend({
  url: 'http://localhost:3000/articles',
  model: Article,

  mainChannel: Radio.channel('main-channel'),

  events: {
    'change add': 'onAdd'
  },

  comparator: (a, b) => {
    if (moment(a.attributes.createdAt).isAfter(moment(b.attributes.createdAt))) return - 1;

    return 1;
  },

  onAdd () {
    console.log('Article added !');
    this.mainChannel.trigger('show:articles:view');
  }
});

export default Articles;
