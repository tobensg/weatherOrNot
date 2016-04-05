Shortly.LinkView = Backbone.View.extend({
  className: 'link',

  template: Templates['link'],

  render: function() {
    console.log('rendering link view');
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
