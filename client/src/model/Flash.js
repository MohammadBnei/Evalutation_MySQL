var Flash = Backbone.Model.extend({
  defaults: {
    type: null,
    message: null,
    createdAt: new Date()
  }
});

export default Flash;

