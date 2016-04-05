Shortly.createZipView = Backbone.View.extend({
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
    var zip = new Shortly.Zip({zip: $form.val()});
    console.log('in shortenUrl in CLV ++++++++++++++++');
    console.log(zip);
    zip.on('request', this.startSpinner, this);
    zip.on('sync', this.success, this);
    zip.on('error', this.failure, this);
    zip.save({})
    $form.val('');
  },

  success: function(zip) {
    this.stopSpinner();
    var view = new Shortly.ZipView({ model: zip });
    this.$el.find('.message').append(view.render().$el.hide().fadeIn());
  },


  failure: function(model, res) {
    this.stopSpinner();
    this.$el.find('.message')
      .html('Please enter a valid ZIP')
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
