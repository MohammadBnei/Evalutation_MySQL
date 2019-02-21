import {MnObject} from 'backbone.marionette';
import Categories from '../collection/Categories';

var CategoryChannel = MnObject.extend({
  default: {
    categories: null
  },

  initialize () {
    this.categories = new Categories();

    this.categories.fetch();
  },

  channelName: 'category-channel',

  radioEvents: {
    'connect:category': (msg) => console.log(`${msg} connected to category channel`)
  },

  radioRequests: {
    'get:categories': 'onGetCategories',
    'get:category:article': 'onGetCategoryArticle',
    'get:categories:id:by:name': 'onGetCategoriesIdByName',
    'set:categories': 'onSetCategories'
  },

  onGetCategoryArticle (ids) {
    return this.categories.find(category => ids.includes(category.attributes.category_id));
  },

  onGetCategories () {
    return this.categories;
  },

  onSetCategories (categories) {
    this.categories = categories;
  },

  onGetCategoriesIdByName (names) {
    let categories = this.categories.models.filter((category) => names.includes(category.attributes.name)).map(category => category.attributes.category_id);

    console.log({categories});
    return categories;
  }
});

export default CategoryChannel;
