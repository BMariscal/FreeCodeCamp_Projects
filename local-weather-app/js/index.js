$(document).ready(function() {
  var long;
  var lat;
  var fTemp;
  var cTemp;
  var kelvin;

  if (navigator.geolocation) {
    //finds local latitude and longitude
    navigator.geolocation.getCurrentPosition(function(position) {
      long =position.coords.longitude;
      lat = position.coords.latitude;

      console.log(long)
      console.log(lat)

      //Open Weather API
      var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=80b276098783c41fc2f53035089e9f02"
      console.log(api)

      //JSON call for Open Weather API
      $.getJSON(api, function(data) {

        var tempSwap = true;
        var weatherType = data.weather[0].description;
        var kelvin = data.main.temp;
        var windSpeed = data.wind.speed;
        var city = data.name;
        var country = data.sys.country;
        var main = data.weather[0].main;
        console.log(country);

        /*temperature is given in Kelvin. Here it's converted to fTemp: Fahrenheit, and
        cTemp: Celsius.*/

        fTemp = (kelvin * (9 / 5) - 459.67).toPrecision(3);
        cTemp = (kelvin - 273.15).toPrecision(3);

        console.log(city);
        //variables displayed in html documents per #id tags
        $("#city").html(city + ', ' + country);
        $("#weatherType").html(weatherType);
        $("#Temp").html(fTemp + '° F');
        $("#windSpeed").html(windSpeed);
        $("#Temp").click(function() {

          if (tempSwap === false) {
            $("#Temp").html(fTemp + ' °F');
            tempSwap = true;
          } else {
            $("#Temp").html(cTemp + ' °C');
            tempSwap = false;
          }

        });

        //converts wind speed to MPH
        windSpeed = (2.237 * (windSpeed)).toPrecision(2);
        $("#windSpeed").html(windSpeed + " mph winds");
        console.log(main)

        //changes background div icon if rain, clear or clouds
        //all if staments so that the second if/else if block runs

        if (main === 'Clouds') {
          $('div').css('background-image', 'url(https://www.shareicon.net/data/128x128/2016/08/18/816189_cloud_512x512.png)')

        }
        if (main == 'Clear') {
          $('div').css('background-image', 'url(http://findicons.com/files/icons/2770/ios_7_icons/256/sun.png)')

        }
        if (main == 'Rain') {
          $('div').css('background-image', 'url(http://icons.iconarchive.com/icons/icons8/windows-8/128/Weather-Rain-icon.png)')

        }
        //changes background based on temperature
        if (fTemp > 80 & main == 'Clear') {
          $('body').css('background-image', 'url(http://image.ibb.co/hAVLDv/andrew_coelho_46448.jpg)')
        } if (fTemp >60 & main == 'Rain'){
            $('body').css('background-image', 'url(https://image.ibb.co/m3WMLa/joy_stamp_21279.jpg)')
         
        } else if (fTemp < 60 & fTemp > 32 & main == 'Rain') {
          $('body').css('background-image', 'url(https://image.ibb.co/mMG7RF/james_zwadlo_88308.jpg)')
        } else if (fTemp < 60 & fTemp > 32 & main == 'Clear') {
          $('body').css('background-image', 'url(http://image.ibb.co/kUV96F/tim_wright_149238.jpg)')
        }
        else if (fTemp < 32) {
          $('body').css('background-image', 'url(https://i.ytimg.com/vi/lwPKC8RTvN8/maxresdefault.jpg)')
        }
      });
    });
  }
});