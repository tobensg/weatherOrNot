Shortly.ZipView = Backbone.View.extend({
  className: 'zip',

  template: Templates['zip'],

  render: function() {
    console.log('rendering zipView');
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
