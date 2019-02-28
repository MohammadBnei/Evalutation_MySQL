import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Comments from '../collection/Comments';

var User = Backbone.Model.extend({
  defaults: {
    user_id: null,
    name: '',
    surname: '',
    email: '',
    img: ''
  },

  initialize () {
    this.on('destroy', this.onDestroy, this);
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

  getComments () {
    var comments = new Comments();

    Backbone.ajax({
      url: 'http://localhost:3000/comments/user/' + this.get('user_id'),
      contentType: 'application/json',
      type: 'GET',
      data: JSON.stringify(this.get('attributes')),
      xhrFields: {
        withCredentials: false
      },
      success: res => comments.add(res),
      error: (error) => console.error(error)
    });

    return comments;
  },

  onDestroy () {
    Radio.channel('flash-channel').request('new:flash', {
      type: 'info',
      message: 'User removed !'
    });
  }
});

export default User;
