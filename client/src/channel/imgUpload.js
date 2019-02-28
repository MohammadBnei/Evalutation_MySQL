import {MnObject} from 'backbone.marionette';

var ImgChannel = MnObject.extend({
  default: {
    name: null
  },

  channelName: 'img-channel',

  radioRequests: {
    'sync:img': 'onSyncImg',
    'replace:img': 'onReplaceImg'
  },

  onSyncImg (image) {
    console.log({image});
    var formData = new FormData();

    formData.append('image', image, image.uniqId);

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3000/img', true);

    xhr.setRequestHeader('Authorization', 'Bearer ' + this.sessionChannel.request('get:token'));

    xhr.send(formData);
  },

  onReplaceImg (image, old) {
    var formData = new FormData();

    formData.append('image', image, image.uniqId);

    var xhr = new XMLHttpRequest();

    let url = 'http://localhost:3000/img' + old ? '/' + old : '';

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Authorization', 'Bearer ' + this.sessionChannel.request('get:token'));

    xhr.send(formData);
  }
});

export default ImgChannel;
