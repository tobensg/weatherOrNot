Weather.createZipView = Backbone.View.extend({
  className: 'creator',

  template: Templates['create'],

  events: {
    'submit': 'checkForm'
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },


  checkForm: function(e) {
    e.preventDefault();
    var whichForm = e.target.className;
    if (whichForm === "zipsForm") {
      console.log('we are in the zip form.  calling pullZip');
      this.pullZip();
    } else {
      console.log('not doing pullzip... do something else');
      this.addConstraints();
    }
  },

  pullZip: function() {
    var $form = this.$el.find('form .text');
    var zip = new Weather.Zip({zip: $form.val()});
    // console.log('in pullZip in CLV ++++++++++++++++');
    // console.log(zip);
    zip.on('request', this.startSpinner, this);
    zip.on('sync', this.success, this);
    zip.on('error', this.failure, this);
    zip.save({});
    $form.val('');
  },


  addConstraints: function(e) {
    // e.preventDefault();
    // getElementById
    var constraints = {}; 
    console.log('can we access the zip?', this.$el);
    constraints.tempReq = this.$el.find('#temp').val() === "on" ? 1 : 0;
    constraints.tempHi = this.$el.find('#tempHi').val();
    constraints.tempLow = this.$el.find('#tempLow').val();
    constraints.wind = (this.$el.find('#wind').val() === "on") ? 1 : 0;
    constraints.windHi = this.$el.find('#windHi').val();
    constraints.windLow = this.$el.find('#windLow').val();
    constraints.windDir = (this.$el.find('#windDir').val() === "on") ? 1 : 0;
    constraints.windTop = this.$el.find('#windTop').val();
    constraints.windBottom = this.$el.find('#windBottom').val();

    console.log('the constraints object', constraints);
    var zipconstraint = new Weather.ZipConstraint({
      temperatureBoolean: constraints.tempReq,
      temperatureHigh: constraints.tempHi,
      temperatureLow: constraints.tempLow,
      windBoolean: constraints.wind,
      windHigh: constraints.windHi,
      windLow: constraints.windLow,
      directionBoolean: constraints.windDir,
      directionHigh: constraints.windTop,
      directionLow: constraints.windBottom
    });

    console.log('in pullZipConstraint in CLV ++++++++++++++++');
    console.log(zipconstraint);
    // zip.on('request', this.startSpinner, this);
    // zip.on('sync', this.success, this);
    // zip.on('error', this.failure, this);
    zipconstraint.save({});
    // $form.val('');
  },

  success: function(zip) {
    this.stopSpinner();
    var view = new Weather.ZipView({ model: zip });
    var constraint = new Weather.ZipConstraintView({model: zipconstraint});
    this.$el.find('.message').append(view.render().$el.hide().fadeIn());
    this.$el.find('.message').append(constraint.render().$el.hide().fadeIn());
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
