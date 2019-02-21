import Backbone from 'backbone';

var Category = Backbone.Model.extend({
  defaults: {
    category_id: null,
    name: '',
    createdAt: ''
  },
  idAttribute: 'category_id',
  urlRoot: 'http://localhost:3000/category'
});

export default Category;
