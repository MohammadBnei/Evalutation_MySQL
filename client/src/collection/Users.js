import Backbone from 'backbone';
import User from '../model/User';

var Users = Backbone.Collection.extend({
  model: User,
  url: 'http://localhost:3000/users'
});

export default Users;
