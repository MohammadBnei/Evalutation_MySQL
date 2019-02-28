import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
var commentModifTemplate = require('./template/commentModif.hbs');

var CommentModifView = View.extend({
  events: {
    'click #save-button': 'saveComment'
  },

  template: commentModifTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),

  saveComment (e) {
    e.preventDefault();

    var value = this.$('#inputContent').val();

    this.model.save(value);
  }
});

export default CommentModifView;
