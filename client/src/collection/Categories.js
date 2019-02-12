import Backbone from 'backbone';
import Category from '../model/Category';

var Categories = Backbone.Collection.extend({
  model: Category
});

module.exports = Categories;
