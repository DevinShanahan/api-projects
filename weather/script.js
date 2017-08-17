$(document).ready(function () {
  'use strict';
  var tempF = 0;
  var tempC = 0;
  var description = '';
  function onPositionRecieved(position) {
    $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude, function(json){
      var city = JSON.stringify(json.results[1].address_components[1].long_name).replace(/"/g,"");
      var state = JSON.stringify(json.results[1].address_components[3].long_name).replace(/"/g,"");
  $("#location").html(city+", "+state);
  });
  $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+position.coords.latitude+'&lon='+position.coords.longitude, function(json) {
    tempC = Math.round(JSON.stringify(json.main.temp)*10)/10;
    tempF = Math.round((JSON.stringify(json.main.temp)*(9/5)+32)*10)/10;
    description = JSON.stringify(json.weather[0].main).replace(/"/g,"");
      if (description == 'Clouds') {
        $('.description').html("");
    $('.description').addClass('fa fa-cloud fa-3x cloud');
  } else if (description == 'Clear') {
    $('.description').html("");
    $('.description').addClass('fa fa-sun-o fa-3x sun');
  } else {
    $('.description').html(description);
  }
    $("#temp").html(tempF);
  });
  }
  function locationNotRecieved(positionError) {
    console.log(positionError);
  }
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onPositionRecieved,locationNotRecieved);
  };
  $('#units').on("click", function() {
    if (document.getElementById("units").innerHTML[1] == 'F') {
      $("#temp").html(tempC);
      $("#units").html("&deg;C");
    } else {
      $("#temp").html(tempF);
      $("#units").html("&deg;F");
    }
  });
});
