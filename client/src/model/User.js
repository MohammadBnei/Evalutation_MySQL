import Backbone from 'backbone';
import Radio from 'backbone.radio';

var User = Backbone.Model.extend({
  defaults: {
    user_id: null,
    name: '',
    surname: '',
    email: '',
    img: ''
  },

  initialize () {
    this.on('sync', this.onSync, this);
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
  },

  onSync () {
    Radio.channel('main-channel').request('show:users:view');
  }
});

export default User;
