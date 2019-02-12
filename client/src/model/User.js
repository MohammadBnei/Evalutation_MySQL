import Backbone from 'backbone';
import uuidv4 from 'uuid/v4';

var User = Backbone.Model.extend({
  defaults: {
    user_id: 0,
    clientId: uuidv4(),
    name: '',
    surname: '',
    email: '',
    img: '',
    createdAt: ''
  },
  initialize () {
    console.log('User has been initialized !');
    this.on('invalid', (model, error) => console.log({model, error}), this);
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
