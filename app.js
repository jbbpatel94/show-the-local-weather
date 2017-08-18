var lat, lon;
var tempInCelcsius;
var api = "https://fcc-weather-api.glitch.me/api/current?";
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var lat = "lat=" + pos.coords.latitude;
      var lon = "lon=" + pos.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function getWeather(lat, lon) {
    $.ajax({
      url: api + lat + "&" + lon,
      success: function(result) {
        $("img").attr("src", result.weather[0].icon);
        $("#city").text(result.name + ", ");
        $("#country").text(result.sys.country);
        $("#desc").text(result.weather[0].main);
        $("#wind").text(result.wind.speed + " km/h");
        $("#pressure").text(result.main.pressure + " ");
        $("#humidity").text(result.main.humidity + "%");
        $("#temp").text(result.main.temp);
        tempInCelcsius = result.main.temp;
      }
    });
  }
  $(".temperature-data a").click(function(ev) {
    ev.preventDefault();
    $(".c").text($(".c").text() == "C" ? "F" : "C");
    if ($(".c").text() == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp);
    } else {
      $("#temp").text(tempInCelcsius);
    }
  });
});
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var d = new Date();
var day = days[d.getDay()];
var hr = d.getHours();
var min = d.getMinutes();
if (min < 10) {
  min = "0" + min;
}
if (hr < 10) {
  hr = "0" + hr;
}
var ampm = hr < 12 ? " am" : " pm";
var date = d.getDate();
var month = months[d.getMonth()];
var year = d.getFullYear();
var x = document.getElementById("date");
x.innerHTML =  date + " " + month + " " + year;
var x = document.getElementById("time");
x.innerHTML = day + " " + hr + ":" + min + ampm ;