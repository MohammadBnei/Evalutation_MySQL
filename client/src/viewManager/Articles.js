import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';

var ArticlesApp = Mn.Application.extend({
  onBeforeStart () {
    console.log('Post view created');
    this.on('showArticlesView', this.render, this);
    this.sessionChannel = Radio.channel('session-channel');
    this.collection.fetch({
      headers: {Authorization: 'Bearer ' + this.sessionChannel.request('get:token')}
    });
    this.template = articlesTemplate;
  }
});

export default ArticlesApp;
