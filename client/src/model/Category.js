import Backbone from 'backbone';

var Category = Backbone.Model.extend({
  defaults: {
    category_id: 0,
    name: '',
    createdAt: ''
  },
  idAttribute: 'category_id',
  urlRoot: '/category'
});

export default Category;
