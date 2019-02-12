import Backbone from 'backbone';
import User from '../model/User';

var Users = Backbone.Collection.extend({
    model: User,
    initialize() {
        this.on('add', (model) => console.log({add: model}));

        this.on('remove',(model) => console.log({remove: model}));

        this.on('change', (model) => console.log({change: model}));
    },
    url: 'http://localhost:3000/users',
});

module.exports = Users;