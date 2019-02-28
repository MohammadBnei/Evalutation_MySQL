import {MnObject} from 'backbone.marionette';
import Radio from 'backbone.radio';
import Categories from '../collection/Categories';
import Category from '../model/Category';

var CategoryChannel = MnObject.extend({
  default: {
    categories: null
  },

  initialize () {
    this.categories = new Categories();

    this.categories.fetch();
  },

  categoriesByArticle (ids) {
    return new Backbone.CollectionSubset({
      parent: Categories,
      filter: category => ids.includes(category.attributes.category_id)
    });
  },

  channelName: 'category-channel',
  flashChannel: Radio.channel('flash-channel'),

  radioRequests: {
    'get:categories': 'onGetCategories',
    'get:category:article': 'onGetCategoryArticle',
    'get:categories:id:by:name': 'onGetCategoriesIdByName',
    'set:categories': 'onSetCategories',
    'add:category': 'onAddCategory'
  },

  onGetCategoryArticle (ids) {
    let categories = [];

    ids.forEach(id => {
      categories.push(this.categories.findWhere({category_id: id}));
    });
    return new Categories(categories);
  },

  onGetCategories () {
    return this.categories;
  },

  onSetCategories (categories) {
    this.categories = categories;
  },

  onGetCategoriesIdByName (names) {
    let categories = this.categories.models.filter((category) => names.includes(category.attributes.name)).map(category => category.attributes.category_id);

    return categories;
  },

  onAddCategory (values) {
    var newCategory = new Category(values);

    newCategory.save({
      success: () => this.flashChannel.request('new:flash', {
        type: 'success',
        message: 'Category created'
      })
    });

    this.categories.add(newCategory);
  }
});

export default CategoryChannel;
