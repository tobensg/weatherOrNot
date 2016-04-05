Shortly.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$el = options.el;
  },

  routes: {
    '': 'index',
    'create': 'create'
  },

  swapView: function(view) {
    this.$el.html(view.render().el);
  },

  index: function() {
    var zips = new Shortly.Zips();
    var zipsView = new Shortly.ZipsView({ collection: zips });
    this.swapView(zipsView);
  },

  create: function() {
    this.swapView(new Shortly.createLinkView());
  }
});
