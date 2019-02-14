import Backbone from 'backbone';
import Radio from 'backbone.radio';
import MainApp from './application/Main';
import HeaderApp from './application/Header';

// Overwriting backbone sync method
var sync = Backbone.sync;

Backbone.sync = (method, model, options) => {
  if (model && (method === 'create' || method === 'update' || method === 'patch')) {
    options.contentType = 'application/json';
    options.data = JSON.stringify(options.attrs || model.toJSON());
  }

  let token = Radio.channel('session-channel').request('get:token');

  _.extend(options, {
    beforeSend: (xhr) => {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
  });

  return sync.call(this, method, model, options);
};

const mainApp = new MainApp();
const headerApp = new HeaderApp();

mainApp.start();
headerApp.start();
