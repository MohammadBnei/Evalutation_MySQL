import Backbone from 'backbone';
import Radio from 'backbone.radio';

var Category = Backbone.Model.extend({
  defaults: {
    category_id: null,
    name: '',
    createdAt: ''
  },

  events: {
    destroy: 'onDestroy'
  },
  idAttribute: 'category_id',
  urlRoot: 'http://localhost:3000/category',

  onDestroy () {
    Radio.channel('flash-channel').request('new:flash', {
      type: 'info',
      message: 'Category removed !'
    });
  }
});

export default Category;
