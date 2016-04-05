Weather.ZipConstraintView = Backbone.View.extend({
  className: 'zipconstraint',

  template: Templates['zipconstraint'],

  render: function() {
    // console.log('rendering zipconstraintView');
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});