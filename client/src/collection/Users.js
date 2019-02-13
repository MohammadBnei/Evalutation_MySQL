import Backbone from 'backbone';
import User from '../model/User';

var Users = Backbone.Collection.extend({
  model: User,
  url: 'http://localhost:3000/users',

  comparator: (a, b) => {
    if (! a.attributes.name) return 0;
    if (! b.attributes.name) return - 1;
    return a.attributes.name.localeCompare(b.attributes.name);
  }
});

export default Users;
