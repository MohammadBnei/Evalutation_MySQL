import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Category from '../model/Category';

var Categories = Backbone.Collection.extend({
  model: Category,

  events: {
    add: 'onAdd'
  },

  url: 'http://localhost:3000/categories',

  comparator: (a, b) => {
    if (! a.attributes.name) return 0;
    if (! b.attributes.name) return - 1;
    return a.attributes.name.localeCompare(b.attributes.name);
  },

  flashChannel: Radio.channel('flash-channel'),

  onAdd () {
    this.flashChannel.request('new:flash', {
      type: 'success',
      message: 'New Category created !'
    });
  }
});

export default Categories;
