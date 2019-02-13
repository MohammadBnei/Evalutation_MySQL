import Backbone from 'backbone';

var User = Backbone.Model.extend({
  defaults: {
    user_id: 0,
    name: '',
    surname: '',
    email: '',
    img: '',
    createdAt: ''
  },
  urlRoot: 'http://localhost:3000/user',
  idAttribute: 'user_id',
  validation: {
    email: {
      required: true,
      pattern: 'email',
      msg: 'Please enter a valid email'
    },
    name: {
      pattern: /^[a-z ,.'-]+$/i,
      msg: 'Please enter a valid name'
    },
    surname: {
      pattern: /^[a-z ,.'-]+$/i,
      msg: 'Please enter a valid surname'
    }
  }
});

export default User;
