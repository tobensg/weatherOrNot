Weather.ZipView = Backbone.View.extend({
  className: 'zip',

  template: Templates['zip'],

  render: function() {
    // console.log('rendering zipView');
    // var relatedId = 1;
    // console.log('on each zip, zip id is: ', this.model.attributes.id);
    // var newConstraint = new Weather.Zipconstraint({zipcodeId: this.model.attributes.id});

    // newConstraint.on('request', function(stuff){console.log('request sent');}, this);
    // newConstraint.on('sync', function(stuff){console.log('request sync');}, this);
    // newConstraint.on('error', function(stuff){console.log('request error');}, this);


    // console.log('new constraint search in zipView.js ', newConstraint);
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
