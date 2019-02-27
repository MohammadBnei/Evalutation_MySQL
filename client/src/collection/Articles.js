import Backbone from 'backbone';
import Article from '../model/Article';
import Radio from 'backbone.radio';
import moment from 'moment';

var Articles = Backbone.Collection.extend({
  url: 'http://localhost:3000/articles',
  model: Article,

  mainChannel: Radio.channel('main-channel'),
  flashChannel: Radio.channel('flash-channel'),

  events: {
    add: 'onAdd'
  },

  comparator: (a, b) => {
    if (moment(a.attributes.createdAt).isAfter(moment(b.attributes.createdAt))) return - 1;

    return 1;
  },

  onAdd () {
    this.flashChannel.request('new:flash', {
      type: 'success',
      message: 'New Article created !'
    });
    this.mainChannel.trigger('show:articles:view');
  },

  search (words, categories) {
    Backbone.ajax({
      url: this.url + '/search',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify({words, categories}),
      xhrFields: {
        withCredentials: false
      },
      success: (res) => {
        if (! res.length) Backbone.trigger('flash', {
          message: 'No results',
          type: 'info'
        });
        this.add(res);
      },
      error: (error) => console.error(error)
    });
  }
});

export default Articles;
