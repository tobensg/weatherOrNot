Handlebars.registerHelper('thumbTest', function(temperature, speed, direction) {

  if (temperature < 75  && temperature >40 && speed > 2 && speed < 9 && direction > 235 && direction < 305 ) {
      return new Handlebars.SafeString(
    "<img src='/thumb_up.png'/>");
  } else {
    return new Handlebars.SafeString(
    "<img src='/thumb_down.png'/>");
  }

});


Handlebars.registerHelper('tempTest', function(temperature) {
  if (temperature > 75) {
      return new Handlebars.SafeString(
    '<span class="bad">' + temperature + '</span>');
  } else if (temperature<40) {
    return new Handlebars.SafeString(
    '<span class="low">' + temperature + '</span>');
  } else {
    return new Handlebars.SafeString(
    '<span class="good">' + temperature + '</span>');
  }

});


Handlebars.registerHelper('windSpeedTest', function(speed) {
  if (speed > 2 && speed < 9) {
      return new Handlebars.SafeString(
    '<span class="good">' + speed + 'm/s</span>');
  } else if (speed<3) {
    return new Handlebars.SafeString(
    '<span class="low">' + speed + 'm/s</span>');
  } else {
    return new Handlebars.SafeString(
    '<span class="bad">' + speed + 'm/s</span>');
  }

});

Handlebars.registerHelper('windDirectionTest', function(direction) {
  // take from Matt Frear's answer to converting-wind-direction-in-angles-to-text-words from stack overflow

  var degToCompass = function (direction) {
    var val = Math.floor((direction / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

  if (direction > 235 && direction < 305) {
      return new Handlebars.SafeString(
    '<span class="good">' + degToCompass(direction) + '</span>');
  } else {
    return new Handlebars.SafeString(
    '<span class="bad">' + degToCompass(direction) + '</span>');
  }

});

