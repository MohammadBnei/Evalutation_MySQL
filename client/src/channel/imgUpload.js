import {MnObject} from 'backbone.marionette';
import Radio from 'backbone.radio';

var ImgChannel = MnObject.extend({
  channelName: 'img-channel',

  url: 'http://localhost:3000/img',

  radioRequests: {
    'sync:img': 'onSyncImg',
    'replace:img': 'onReplaceImg',
    'delete:img': 'onDeleteImg'
  },

  sessionChannel: Radio.channel('session-channel'),

  onSyncImg (image) {
    var formData = new FormData();

    formData.append('image', image, image.uniqId);

    this.sendImg(formData);
  },

  onReplaceImg ({image, old}) {
    var formData = new FormData();

    formData.append('image', image, image.uniqId);
    let param = old ? '/' + old : '';

    this.sendImg(formData, param);
  },

  onDeleteImg (image) {
    var xhr = new XMLHttpRequest();

    xhr.open('DELETE', this.url + '/' + image, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.sessionChannel.request('get:token'));
    xhr.send();
  },

  sendImg (formData, param = '') {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', this.url + param, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.sessionChannel.request('get:token'));
    xhr.send(formData);
  }
});

export default ImgChannel;
