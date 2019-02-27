import Backbone from 'backbone';
import Radio from 'backbone.radio';
import User from '../model/User';

var Users = Backbone.Collection.extend({
  model: User,
  url: 'http://localhost:3000/users',

  events: {
    add: 'onAdd'
  },

  flashChannel: Radio.channel('flash-channel'),

  comparator: (a, b) => {
    if (! a.attributes.name) return 0;
    if (! b.attributes.name) return - 1;
    return a.attributes.name.localeCompare(b.attributes.name);
  },

  search (words) {
    Backbone.ajax({
      url: this.url + '/search',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify({words}),
      xhrFields: {
        withCredentials: false
      },
      success: (res) => {
        if (! res.length) this.flashChannel.request('new:flash', {
          message: 'No results',
          type: 'info'
        });
        else {
          this.flashChannel.request('new:flash', {
            message: res.length + ' results',
            type: 'info'
          });
          this.add(res);
        }
      },
      error: (error) => console.error(error)
    });
  },

  onAdd () {
    this.flashChannel.request('new:flash', {
      type: 'success',
      message: 'New Category created !'
    });
  }
});

export default Users;
