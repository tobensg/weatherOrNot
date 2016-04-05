Shortly.createLinkView = Backbone.View.extend({
  className: 'creator',

  template: Templates['create'],

  events: {
    'submit': 'shortenUrl'
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  shortenUrl: function(e) {
    e.preventDefault();
    var $form = this.$el.find('form .text');
    var link = new Shortly.Link({ url: $form.val(), zip: $form.val()});
    console.log('in shortenUrl in CLV ++++++++++++++++');
    console.log(link);
    link.on('request', this.startSpinner, this);
    link.on('sync', this.success, this);
    link.on('error', this.failure, this);
    link.save({});
    $form.val('');
  },

  success: function(link) {
    this.stopSpinner();
    var view = new Shortly.LinkView({ model: link });
    this.$el.find('.message').append(view.render().$el.hide().fadeIn());
  },

  // success: function(zip) {
  //   this.stopSpinner();
  //   var view = new Shortly.LinkView({ model: link });
  //   this.$el.find('.message').append(view.render().$el.hide().fadeIn());
  //   // var view2 = new Shortly.ZipView({ model: zip });
  //   // this.$el.find('.message').append(view2.render().$el.hide().fadeIn());
  // },

  failure: function(model, res) {
    this.stopSpinner();
    this.$el.find('.message')
      .html('Please enter a valid URL')
      .addClass('error');
    return this;
  },

  startSpinner: function() {
    this.$el.find('img').show();
    this.$el.find('form input[type=submit]').attr('disabled', 'true');
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  },

  stopSpinner: function() {
    this.$el.find('img').fadeOut('fast');
    this.$el.find('form input[type=submit]').attr('disabled', null);
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  }
});
