import Backbone from 'backbone';
import Category from '../model/Category';

var Categories = Backbone.Collection.extend({
  model: Category,

  url: 'http://localhost:3000/categories',

  comparator: (a, b) => {
    if (! a.attributes.name) return 0;
    if (! b.attributes.name) return - 1;
    return a.attributes.name.localeCompare(b.attributes.name);
  }
});

export default Categories;
