import Backbone from 'backbone';
import User from '../model/User';

var Users = Backbone.Collection.extend({
  model: User,
  url: 'http://localhost:3000/users',

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
        if (! res.length) Backbone.trigger('flash', {
          message: 'No results',
          type: 'info'
        });
        this.add(res);
      },
      error: (error) => console.error(error)
    });
  }
});

export default Users;
