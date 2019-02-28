import {View} from 'backbone.marionette';
import Radio from 'backbone.radio';
var commentModifTemplate = require('./template/commentModif.hbs');

var CommentModifView = View.extend({
  events: {
    'click #save-button': 'saveComment'
  },

  triggers: {
    'click #cancel-button': 'click:close'
  },

  template: commentModifTemplate,

  sessionChannel: Radio.channel('session-channel'),
  mainChannel: Radio.channel('main-channel'),
  flashChannel: Radio.channel('flash-channel'),

  saveComment (e) {
    e.preventDefault();

    var content = this.$('#inputContent').val();

    this.model.save({content}, {
      success: () => {
        this.flashChannel.request('new:flash', {
          type: 'success',
          message: 'Comment modified !'
        });
        this.trigger('cancel');
      }
    });
  }
});

export default CommentModifView;
